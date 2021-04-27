The `next` function is an important part of middleware. 
'next' signals the end of middleware functions

express replies on the next() to know when to move forwards


//app.js
app.use((req, res, next) => {
  console.log('Hello');
  next();   // next is needed to pass both logs
});  

app.use((req, res, next) => {
  console.log('world');  
  next();
});  


//template
function middleware(){
  return function(req, res, next){
    //middleware logic
  }
}
middleware()  // => function

  

//handling error by using next()
app.use((req, res, next) => {
  console.log('Hello');
  const err = new Error('Oh Noes!');  // creating a custom error constructor
  next(err);  // err as function call
});  

app.use((req, res, next) => {
  console.log('world');  
  next();
});  



//questions

How do you tell express about an error that needs to be handled?
  pass it into the next function

What is the behavior of an app where middleware calls neither next nor sends a response to the client?
  The app appears to hang indefinitely
  
What HTTP Status code correlates with a message of "Not Found"?
  404

The next function does not have to always be called to end a middleware function.

What is one reason it's important to handle errors in an application?
  It helps users understand how to interact with your app



    
