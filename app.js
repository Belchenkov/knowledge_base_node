const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Bring in Models
let Article = require('./models/Article');

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Routes
app.get('/', (req, res) => {
    Article.find({}, (err, articles) => {
        if (err) throw err;

        res.render('index', {
            title: 'Articles',
            articles
        });
    });
});

// Add Route
app.get('/articles/add', (req, res) => {
    res.render('add_article', {
        title: 'Add Article'
    });
});

// Add Submit POST Route
app.post('/articles/add', (req, res) => {
   let article = new Article();
   article.title = req.body.title;
   article.author = req.body.author;
   article.body = req.body.body;

   article.save()
       .then(result => {
           res.redirect('/');
       })
       .catch(err => console.log(err));
});

const PORT = 5000;

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-1owsl.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
    { useNewUrlParser: true }
)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`MongoDB Connected!`);
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => console.error(err));