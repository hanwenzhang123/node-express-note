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


//CALL BACKS
function getUsers(cb){
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) return cb(err);
    const users = JSON.parse(data);
    return cb(null, users);
  });
}

app.get('/', (req,res) => {
  getUsers((err, users)=>{
    if(err){
      res.render('error', {error:err});
    } else {
      res.render('index', {title: "Users", users: users.users})
    }
  });
}); 
