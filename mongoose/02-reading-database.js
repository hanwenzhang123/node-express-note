const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitDB', {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema ({  
  name: String,
  rating: Number,
  review: String
});

const Fruit = mongoose.model('Fruit', fruitSchema);    

const fruit = new Fruit ({  
  name: 'Apple', 
  rating: 7,
  review: 'pretty solid as a fruit'
});
  
//fruit.save();   //only first time then comment out

const kiwi = new Fruit ({ 
  name: 'Kiwi', 
  rating: 10,
  review: 'the best fruit'
});

const orange = new Fruit ({ 
  name: 'Orange', 
  rating: 4,
  review: 'too sour for me'
});

const banana = new Fruit ({ 
  name: 'Banana', 
  rating: 3,
  review: 'weird texture'
});

//Fruit.insertMany([kiwi, orange, banana], function(err){   //only first time then comment out
//  if (err) {
//    console.log(err);
//  } else {
//    console.log('Successfully saved all the fruits to fruitsDB'); 
//  }
//});   

Fruit.find(function(err, fruits) {    //the fruits here get us the fruit objects
  if (err) {
    console.log(err);
  } else {
    
    mongoose.connection.close();   //no needs ^C to close the shell
    
    fruits.forEach(function(fruit){
      console.log(fruit.name);
     //console.log(fruits); 
    });
  }
});   
