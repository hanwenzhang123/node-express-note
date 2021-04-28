//app.js
app.get('/', async (req,res) => {  //always use async, it returns as a promise function
  try {  //try catch block handles err
    const users = await getUsers(); //await inside async, tells wait until this line of code finishes before moving on to the next line of code
    // const doSomethingElse = await doSomethingELse() //if we have another await function, it'll be like this
    res.render('index', {title: "Users", users: users.users}); //render it
  } catch(err){ //catch the err and render it
    res.render('error', {error: err});
  }
}); 


//example
app.get('/:id', async (req, res) => {
 try {
   const user = await getUser(req.params.id);
   const followers = await getFollowers(user);
   res.render('profile', {title: "Profile Page", user: user, followers: followers});
 } catch(err){
   res.render('error', {error: err});
 }
});
