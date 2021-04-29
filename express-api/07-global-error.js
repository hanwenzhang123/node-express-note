A route that is not exist
write a global error handler to send error messages to the client as JSON.

middleware generally does one of the two things
end the response cycle or move to the next 


// Send a GET request to /quotes/quote/random to READ (view) a random quote
//creating a custom error handler
app.use((req, res, next) => {   //sends a next para
  const err = new Error("Not Found");
  err.status = 404    //change the status to 404
  next(err);    // move to the next in the middleware
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message      //send an error message
    }
  })
});

 
  
