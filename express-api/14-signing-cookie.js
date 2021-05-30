//The cookie will still be visible, but it has a signature, so it can detect if the client modified the cookie.
//If it does not match, then it will give an error.
//instead of sending the raw value, we send signed cookie

//the purpose is not for hide or encrypt, but varify its integrity and something has not changed
//make sure the original data that we send to the browser is still the data that sends back to us

//HMAC, hashed based massage authentification code


const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser('thisismysecret'));    //pass a secret

app.get('/greet', (req, res) => {
    const { name = 'No-name' } = req.cookies;
    res.send(`Hey there, ${name}`)
})

app.get('/setname', (req, res) => {
    res.cookie('name', 'henrietta');
    res.cookie('animal', 'harlequin shrimp')
    res.send('OK SENT YOU A COOKIE!!!')
})

app.get('/getsignedcookie', (req, res) => { 
    res.cookie('fruit', 'grape', { signed: true })    //send the signed cookie where fruit is grape; however, we do not see fruit when console log
    res.send('OK SIGNED YOUR FRUIT COOKIE!')
})

app.get('/verifyfruit', (req, res) => {
    console.log(req.cookies)
    console.log(req.signedCookies)
    res.send(req.signedCookies)   //unsign the cookie using req.signedCookie and ready for use, now we can see the fruit is grape
})

app.listen(3000, () => {
    console.log("SERVING!")
})
  
