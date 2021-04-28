// PROMISES 
function getUsers(){
  return new Promise((resolve, reject)=> { //promise accepts 2 parameter, resoleve and reject
    fs.readFile('data.json', 'utf-8', (err, data)=> { //read the file then define err and data
      if(err){  //if read the file not successful, give err
        reject(err); //if err, reject the err
      } else {
        const users = JSON.parse(data); //parse json data to user
        resolve(users); // use resolve instead of return 
      }
    });
  });
}

app.get('/', (req,res) => {
  getUsers()
    .then((users)=> {  //we have the user then render the page
      res.render('index', {title: "Users", users: users.users});
    })
    .catch((err)=> {  //if encounter error
      res.render('error', {error: err});
    });
}); 



//example
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
