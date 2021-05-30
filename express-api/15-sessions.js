//we store session on the server side but not browser side as cookie
//server send back a key like an id that stores your data
//browser is having a cookie that stores as a session id to the server side to retrieve data


//https://www.npmjs.com/package/express-session
$ npm install express-session

// cookie-parser middleware no longer needs to be used for this module to work.


const express = require('express');
const app = express();
const session = require('express-session');

app.use(session({ secret: 'thisisnotagoodsecret' }));

app.get('/viewcount', (req, res) => {   //now once you get to  the viewcount page, you will get to see the connect.sid that is associate to your browser
    if (req.session.count) {
        req.session.count += 1;
    } else {
        req.session.count = 1;
    }
    res.send(`You have viewed this page ${req.session.count} times`)        //goes up whenever you view the page, refresh the number when change browser, all value stores in server side
}) 

app.listen(3000, () => {
    console.log('listening on port 3000')
})

  

//more express session
//resave: false - force the session to be saved back to the session store even if the session was never modified during the request
//saveUninitialized: false - force a session that is uninitialized to be saved to the store, a session is uninitialized when it is new but not modified. 

const express = require('express');
const app = express();
const session = require('express-session');

const sessionOptions = { secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false }  //we set it as when restart the browser, session restart, we set the memorial to local not express
app.use(session(sessionOptions));

app.get('/viewcount', (req, res) => {
    if (req.session.count) {
        req.session.count += 1;
    } else {
        req.session.count = 1;
    }
    res.send(`You have viewed this page ${req.session.count} times`)
})

app.get('/register', (req, res) => {        //we specify username in the query like /register?username=hanwen
    const { username = 'Anonymous' } = req.query;       //pass an username
    req.session.username = username;    //whatever the username saved in the session or we use the default anonymous
    res.redirect('/greet')
})

app.get('/greet', (req, res) => {
    const { username } = req.session;
    res.send(`Welcome back, ${username}`)       //we direct from register to here and use the username if the session information stored otherwise anonymous or undefined if not go to register
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})
  
