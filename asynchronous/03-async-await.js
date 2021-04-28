app.get('/:id', async (req, res) => {
 try {
   const user = await getUser(req.params.id);
   const followers = await getFollowers(user);
   res.render('profile', {title: "Profile Page", user: user, followers: followers});
 } catch(err){
   res.render('error', {error: err});
 }
});
