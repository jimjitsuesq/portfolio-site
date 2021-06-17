const express = require('express');
const {projects} = require('./data.json');
const app = express();
app.locals.projects = projects

app.use('/static', express.static('public'));
app.use('/images', express.static('images'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index.pug');
});

app.get('/about', (req, res) => {
    res.render('about.pug');
});

app.get('/project/:id.html', (req, res) => {
    const id = req.params.id
    res.render('project.pug', projects[id])
});

app.get('/projects/:id', (req, res) => {
    
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});