const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');   //require our model

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;     //check error
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', function(req, res){ 
    res.render('home');  
});  

app.get('/makecampground', async (req, res) => { 
    const camp = new Campground ({title: ' My Backyard', description: 'cheap camping'});
    await camp.save();
    res.send(camp)
});  
  

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})
