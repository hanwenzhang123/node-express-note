https://mongoosejs.com/docs/validation.html

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

const fruit = new Fruit ({  
  name: 'Apple',      //name is required
  rating: 7,    // can only 1-10 due to validation 
  review: 'pretty solid as a fruit'
});


  
