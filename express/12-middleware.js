Basic form of Express middleware
(req, res, next) => {
  // do something
  next();
}
 
app.use('/users', (req, res, next) => {});    
// middleware read and modify the request and response objects - eg cookie parser modify the response object
// next is a function that must be called when the work is done
// app.use - run the middleware for every request 
// To only run it for a specific route, pass the router argument in before the Middleware function

app.get('/users', (req, res, next) => {}); 
//you can also limit to only use get request handling routes



//request object
app.use((req, res, next) => {
  req.message = 'This message made it!';
  next();
});  

app.use((req, res, next) => {
  console.log(req.message);   //it will log the message in the console
  next();
});  



//question
Middleware functions always execute in a specific sequence.

When is next called in express middleware?
  when the middleware's work is done

How is middleware added to an Express application?
  By passing a function to app.use();

What objects does middleware have access to through its parameters?
  The request and response object

  
