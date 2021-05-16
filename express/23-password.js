//password middleware (fake)
app.use((req, res, next) => {
  //if(req.path === '/secret'){   
    const { password } = req.query;   // only this without if, it applies to any url with ?password=chickennugget
    if (password === 'chickennugget') {
        next();   //pass the password
    }
    res.send("SORRY YOU NEED A PASSWORD!")
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

  
