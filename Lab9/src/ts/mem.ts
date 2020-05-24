import {Memes, MemesCollection} from "./Memes"
import express = require("express");
import createError = require('http-errors');

const app : express.Application = express();
const memesCollection : MemesCollection = new MemesCollection();
memesCollection.add(new Memes(10, 'Gold', 1000, 'https://i.redd.it/h7rplf9jt8y21.png'));
memesCollection.add(new Memes(9, 'Platinum', 1100, 'http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg'));
memesCollection.add(new Memes(8, 'Elite', 1200, 'https://i.imgflip.com/30zz5g.jpg'));
memesCollection.add(new Memes(6, 'Good doggo', 2139, 'https://i.pinimg.com/originals/1c/92/aa/1c92aaa03be010e2e301e109aa8d5825.jpg'));
memesCollection.add(new Memes(5, 'Sad doggo', 1800, 'https://cdn.ebaumsworld.com/2019/06/19/083145/85994209/DogMemes12.png'));
memesCollection.add(new Memes(4, 'Fast doggo', 1500, 'https://i0.kym-cdn.com/photos/images/newsfeed/001/092/510/e30.jpg'));

app.set('view engine', 'pug');

app.get('/', function(request: express.Request, response: express.Response) {
    response.render('index', { title: 'Meme market', message: 'Hello there!', memes: memesCollection.best_memes() })
});

app.get('/meme/:memeId', function (request: express.Request, response: express.Response) {
    const meme = memesCollection.get_meme(parseInt(request.params.memeId, 10));
    response.render('meme', { 'meme': meme });
});

app.use(express.urlencoded({
    extended: true
}));

app.post('/meme/:memeId', function(request: express.Request, response: express.Response, next: express.NextFunction) {
    const meme = memesCollection.get_meme(parseInt(request.params.memeId, 10));
    const price = request.body.price;
    if (meme === null || isNaN(price)){
        next(createError(400));
    } else {
        meme.change_price(price);
        response.render('meme', { 'meme': meme })
    }
});

app.listen(8080, () => {
    console.log("App is running at http://localhost:%d\n", 8080);
    console.log("Press CTRL-C to stop\n");
});

app.use(function(request: express.Request, response: express.Response, next: express.NextFunction) {
    next(createError(404));
});

app.use((err: any, request: express.Request, response: express.Response, next: express.NextFunction) => {
    response.locals.message = err.message;
    response.locals.error = request.app.get('env') === 'development' ? err : {};
    response.status(err.status || 500);
    response.render('error');
});