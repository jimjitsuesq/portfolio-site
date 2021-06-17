const express = require('express');
const {projects} = require('./data.json');
const app = express();
app.locals.projects = projects;

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
    const id = req.params.id;
    res.render('project.pug', projects[id]);
});

/* GET generated error route - create and throw 500 server error */
app.get('/error', (req, res, next) => {
    console.log('Custom error route called');
  
    const err = new Error();
    err.status = 500;
    err.message = `Custom ` + err.status + ` error thrown`
    throw err;
  });

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});

app.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    err.message = 'Oops! That page was not found!'
    console.log(err.status, 'error handler called');
    console.log(err.message);
    res.status(404).render('page-not-found.pug', {err});
});

app.use((err, req, res, next) => {
  if (err) {
    console.log('Global error handler called');
  }
  if (err.status === 404) {
    res.status(404).render('page-not-found', { err });
  } else {
    err.message = err.message || `Oops!  It looks like something went wrong on the server.`;
    res.status(err.status || 500).render('error.pug', { err });
    console.log(err.status);
    console.log(err.message);
  }
});