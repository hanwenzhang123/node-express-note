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

  
