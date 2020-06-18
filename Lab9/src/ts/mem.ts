import express = require("express");
import createError = require('http-errors');
import csurf from "csurf";
import cookieParser = require("cookie-parser");
import * as sqlite from "sqlite3";
import session from 'express-session';
import {Memes, MemesCollection} from "./Memes"
import {DbHandlerOpen, DbHandlerAll, DbHandlerRun, DbHandlerGet} from "./DBWrapper"
import {User} from "./User"
const connectSqlite = require('connect-sqlite3');

sqlite.verbose();
const csrfProtection = csurf({ cookie: true });
const app : express.Application = express();
const memesCollection : MemesCollection = new MemesCollection();
const user : User = new User();

async function dbInitialization() {
    const db : sqlite.Database = await DbHandlerOpen("memes.db");
    await DbHandlerRun(db, `CREATE TABLE IF NOT EXISTS memes (id INTEGER PRIMARY KEY, name TEXT, url TEXT, prices TEXT);`, []);
    await DbHandlerRun(db, "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username VARCHAR, password VARCHAR)", []);
    await user.addUser(db, 1, "admin", "admin");
    await user.addUser(db, 2, "user", "user");

    memesCollection.add(db, new Memes(10, 'Gold', 1000, 'https://i.redd.it/h7rplf9jt8y21.png'));
    memesCollection.add(db, new Memes(9, 'Platinum', 1100, 'http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg'));
    memesCollection.add(db, new Memes(8, 'Elite', 1200, 'https://i.imgflip.com/30zz5g.jpg'));
    memesCollection.add(db, new Memes(6, 'Good doggo', 2139, 'https://i.pinimg.com/originals/1c/92/aa/1c92aaa03be010e2e301e109aa8d5825.jpg'));
    memesCollection.add(db, new Memes(5, 'Sad doggo', 1800, 'https://cdn.ebaumsworld.com/2019/06/19/083145/85994209/DogMemes12.png'));
    memesCollection.add(db, new Memes(4, 'Fast doggo', 1500, 'https://i0.kym-cdn.com/photos/images/newsfeed/001/092/510/e30.jpg'));
}

dbInitialization().then( () => {
    app.use(cookieParser('randomkey'));

    app.use(express.urlencoded({
        extended: true
    }));

    app.use(session({
        resave: false,
        saveUninitialized: true,
        secret: 'randomkey',
        store: new connectSqlite(session)()
    }));

    app.set('view engine', 'pug');

    // New connection instance with database for every requests using middleware - transaction should not overlap
    app.use((request: express.Request, response: express.Response, next: express.NextFunction) => {
        response.locals.db = new sqlite.Database("memes.db");
        next();
    })

    // Main page rendering
    app.get('/', async function(request: express.Request, response: express.Response) {
        response.render('index', { title: 'Meme market', message: 'Hello there!', memes: await memesCollection.mostExpensiveMemes(response.locals.db),
                                        username: request.session!.username});
    });

    // Meme site rendering
    app.get('/meme/:memeId', csrfProtection, async function (request: express.Request, response: express.Response, next: express.NextFunction) {
        const meme = await memesCollection.get_meme(response.locals.db, parseInt(request.params.memeId, 10));

        if (meme == null) {
            next(createError(400));
        }

        response.render('meme', { 'meme': meme, csrfToken: request.csrfToken() });
    });

    // Meme price changing
    app.post('/meme/:memeId', csrfProtection, async function(request: express.Request, response: express.Response, next: express.NextFunction) {
        if (request.session!.username){
            memesCollection.updateMemePrice(response.locals.db, parseInt(request.params.memeId, 10), request.body.price, request.session!.username).then((meme) => {
                response.render('meme', { 'meme': meme, csrfToken: request.csrfToken() });
            }).catch(() => {
                console.log('zly input');
                next(createError(400));
            })
        } else {
            next(createError(400));
        }
    });

    // Login site rendering
    app.get('/login', csrfProtection, function (request: express.Request, response: express.Response, next: express.NextFunction) {
        return response.render('login', {
            csrfToken: request.csrfToken()
        });
    });

    // Logging to system
    app.post('/login', csrfProtection, async function (request: express.Request, response: express.Response, next: express.NextFunction) {
        if (await user.getUser(response.locals.db, request.body.username, request.body.password)) {
            request.session!.username = request.body.username;
        }

        response.redirect('/');
    });

    // Logout from the system
    app.get('/logout', function (request: express.Request, response: express.Response, next: express.NextFunction) {
        delete(request.session!.username);
        response.redirect('/');
    });

    // Express server listen and console info
    app.listen(8080, () => {
        console.log("App is running at http://localhost:%d\n", 8080);
        console.log("Press CTRL-C to stop\n");
    });

    // Error handling
    app.use(function(request: express.Request, response: express.Response, next: express.NextFunction) {
        next(createError(404));
    });

    app.use((err: any, request: express.Request, response: express.Response, next: express.NextFunction) => {
        response.locals.message = err.message;
        response.locals.error = request.app.get('env') === 'development' ? err : {};
        response.status(err.status || 500);
        response.render('error');
    });
})