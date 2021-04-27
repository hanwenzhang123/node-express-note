const express = require('express');

const app = express();

app.get('/', (req, res) => {    // http://localhost:3000/
    res.send('<h1>I love Treehouse!</h1>');
});

app.get('/hello', (req, res) => {   // http://localhost:3000/hello
    res.send('<h1>Hello, JavaScript Developer!</h1>');
});


app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});
