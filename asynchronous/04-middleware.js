function asyncHandler(cb){    //create a function that wraps around our normal route handling function
  return async (req, res, next) => {    //this function we can pass all the code we would normally pass
    try{    //try block, we will await whatever function we have passed to the asyncHandler function with the normal route handling parameters
      await cb (req, res, next);  
    } catch(err){
      res.render('error', {error: err});
    } // render our err page
  }
}
// we do not need to include this err code in every single route
// you can delete the error handling code in the route

//ASYNC/AWAIT

app.get('/', asyncHandler(async (req, res) => {
  const users = await getUsers(); // throw new Err('It broke')  -  throw error to check
  res.render('index', {title: 'Users', users: users.users});
}));
