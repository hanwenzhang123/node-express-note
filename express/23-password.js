//password middleware (fake)
app.use((req, res, next) => {
  //if(req.path === '/secret'){       //only applies to /secret?password=chickennugget
    const { password } = req.query;   //without if, it applies to any url with ?password=chickennugget
    if (password === 'chickennugget') {   //only if the pw is chickennugget we pass to the next middleware handler
        next();   //pass the password to the next
    }
    res.send("SORRY YOU NEED A PASSWORD!")    //if pw is not correct, you need a password
  //} 
})

app.get('/secret', (req, res) => {
    res.send('MY SECRET IS: Sometimes I wear headphones in public so I dont have to talk to anyone')
})



//protectinng a specific route
const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') {
        next();   //pass the password
    }
    res.send("YOU NEED A PASSWORD!")    //if the password not passed
}


app.get('/secret', verifyPassword, (req, res) => {    //pass the verifyPassword to first callback, here is only works on /secrete
    res.send('MY SECRET IS: Sometimes I wear headphones in public so I dont have to talk to anyone')
})
      //the verifyPassword only for the secret path
  
