Example of a callback with performing two asynchronous operations:

app.get('/:id', (req, res) => {
 getUser(req.params.id, (err, user)=>{
   if(err){
     res.render('error', {error: err});
   } else {
     getFollowers(user, (err, followers) =>{
       if(err){
         res.render('error', {error: err});
       } else {
         res.render('profile', {title: "Profile Page", user: user, followers: followers});
       }
     }); 
   }
 });
});
