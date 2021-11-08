const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitDB', {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema ({  
  name: {     
    type: String,
    required: [true, 'Please check your data entry, no name specified']   //like NOT NULL
  },
  rating: {
    type: Number,
    min: 1,     //set limit
    max: 10     //set limit
  },
  review: String
});

const Fruit = mongoose.model('Fruit', fruitSchema);    


const personSchema = new mongoose.Schema ({ 
  name: String,
  age: Number,
  favoriteFruit: fruitSchema    //embed a fruitSchema to person document
});

const Person = mongoose.moodel('Person', personSchema);

const pineapple = new Fruit ({  
  name: 'pineapple', 
  rating: 9, 
  review: 'Great Fruit.'
});

//pineapple.save();

const person = new person ({
  name: 'Amy',
  age: 12,
  favoriteFruit: pineapple
});

//person.save();


const person = new person ({
  name: 'John',
  age: 37
});

//person.save();

const mango = new Fruit ({  
  name: 'mango', 
  rating: 6, 
  review: 'Decent Fruit.'
});

//pineapple.save();


Person.updateOne({name: 'John'}, {favoriteFruit: mango}, function(err){
  if (err) {
    console.log(err);
  } else {
    console.log('Successfully updated'); 
  }
});  
  
