const express = require('express');
const path = require('path');

const app = express();

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Routes
app.get('/', (req, res) => {
    let articles = [
        {
            id: 1,
            title: 'Article One',
            author: 'Kokorin',
            body: 'This is article one'
        },
        {
            id: 2,
            title: 'Article Two',
            author: 'Mamaev',
            body: 'This is article two'
        },
        {
            id: 3,
            title: 'Article Three',
            author: 'Kerzakov',
            body: 'This is article three'
        }
    ];

    res.render('index', {
        title: 'Articles',
        articles
    });
});

// Add Route
app.get('/articles/add', (req, res) => {
    res.render('add_article', {
        title: 'Add Article'
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`);
});