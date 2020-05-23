// const most_expensive = [
//     {'id': 10,
    
//     'name': 'Gold',
    
//     'price': 1000,
    
//     'url': 'https://i.redd.it/h7rplf9jt8y21.png'},
    
//     {'id': 9,
    
//     'name': 'Platinum',
    
//     'price': 1100,
    
//     'url': 'http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg'},
    
//     {'id': 8,
    
//     'name': 'Elite',
    
//     'price': 1200,
    
//     'url': 'https://i.imgflip.com/30zz5g.jpg'}
// ]

// import express = require("express");
import {createServer} from 'http';

let server = createServer(
    (req, res) => {
        res.write('Ale super!');
        res.end();
    }
);

server.listen(8080);

// const app: express.Application = express();
// app.set('view engine', 'pug');
// app.get('/', function(req, res) {
//     res.render('index', { title: 'Meme market', message: 'Hello there!', memes: most_expensive })
// });