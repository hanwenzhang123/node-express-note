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
  
