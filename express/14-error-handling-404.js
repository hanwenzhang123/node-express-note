middleware
(req, res, next) => {}

error middleware
(err, req, res, next) => {}


//app.js
app.use((req, res, next) => {
  console.log("Hello");
  const err = new Error('Oh noes!');
  err.status = 500;
  next(err);
});

app.use((req, res, next) => {   //when it is 404, this page shows
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(err, req, res, next) => {
  res.locals.error = err;   //set local
  res.status(err.status);   //take the code we set as 500 earlier
  res.render('error');
});


//error.pug - for styling her
extends layout

block content
  h1 = error.message
  h2 = error.status
  pre = error.stack



//questions
Where is the best place to put middleware that creates a 404 error?
  After all the other routes have been declared
  
What happens if we don't implement our own error handler in an express app?
  Express handles errors with default middleware

What does a 404 error mean?
  Express could not match the requested route to any of it's route handlers

How is error handling middleware differentiated from other middleware?
  It has four parameters as opposed to three

Locals can be set directly on the response object, on the locals property.

   
