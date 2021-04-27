express.static(root, [option])

//attach stylesheet in the code
//app.js
app.use('/static', express.static('public'))   //the public folder where contains css files

//layout.pug
link(rel='stylesheet', href='/static/stylesheets/style.css')    //the route


