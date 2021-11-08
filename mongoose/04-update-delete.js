https://mongoosejs.com/docs/api/model.html#model_Model.updateOne
https://mongoosejs.com/docs/api/model.html#model_Model.deleteOne

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitDB', {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema ({  
  name: {     
    type: String,
    required: [true, 'Please check your data entry, no name specified']   
  },
  rating: {
    type: Number,
    min: 1, 
    max: 10  
  },
  review: String
});

const Fruit = mongoose.model('Fruit', fruitSchema);    

const fruit = new Fruit ({  
  name: 'Apple', 
  rating: 7,  
  review: 'pretty solid as a fruit'
});

//updateOne
Fruit.updateOne({__id: ' 216784678'}, {name: 'Peach'}, function(err){   //first parameter is the filter, second is what you want to update about. third is callback
  if (err) {
    console.log(err)
  } else {
    console.log('successfully updated');
  }
});

//deleteOne
Fruit.deleteOne({name: 'Peach'}, function(err){   //first parameter matches the condition, seconnd one is the callback, log err
  if (err) {
    console.log(err)
  } else {
    console.log('successfully deteled');
  }
});

//person example
const personSchema = new mongoose.Schema ({ 
  name: String,
  age: Number
});

const Person = mongoose.moodel('Person', personSchema);

const person = new person ({
  name: 'John',
  age: 37
});

person.save();

//deleteMany()
Fruit.deleteMany({name: 'John'}, function(err){    //clear out the condition or clear out multiple values
  if (err) {
    console.log(err)
  } else {
    console.log('successfully deteled all the document');
  }
});
