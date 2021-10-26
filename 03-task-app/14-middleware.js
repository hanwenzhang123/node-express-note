without middleware: new request -> run route handler
with middleware: new request -> do something -> run route handler //customize the behaviour of the server to fit our needs.
//this something is a function that runs and we can set up this function to do whatever we would like.

to register a new middleware function:  app.use()
