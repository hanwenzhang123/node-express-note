app.get('/:id', (req, res) => {
 getUser(req.params.id)
   .then((user)=>{
     return getFollowers(user);
   })
   .then((user, followers)=>{
     res.render('profile', {title: "Profile Page", users: user, followers: followers});
   })
   .catch((err) => {
     res.render('error', {error: err});
   });
});
