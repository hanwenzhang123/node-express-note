function asyncHandler(cb){
  return async (req, res, next) => {
    try{
      await cb (req, res, next);
    } catch(err){
      res.render('error', {error: err});
    }
  }
}

// async/await
app.get('/', asyncHandler(async (req, res) => {
  const users = await getUsers();
// throw new Err('It broke')    throw error check
  res.render('index', {title: 'Users', users: users.users});
}));
