//store your data seperately, not directly store the data, but then store references to document ID's somewhere inside the parent
//medium amount data implementatiom; two schemas here in this file
//usually define by somewhere else, embed the data like sql database 

//https://mongoosejs.com/docs/populate.html


const mongoose = require('mongoose');
const { Schema } = mongoose;        //const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/relationshipDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
});

const farmSchema = new Schema({     //mongoose.Schema
    name: String,
    city: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]   //The ref option is what tells Mongoose which model to use during population, in our case the Product model. 
})     //type: Schema.Types.ObjectId - configuration for a path in a schema, set to an array of ObjectIds
//populate the different products to different farms

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

// Product.insertMany([
//     { name: 'Goddess Melon', price: 4.99, season: 'Summer' },
//     { name: 'Sugar Baby Watermelon', price: 4.99, season: 'Summer' },
//     { name: 'Asparagus', price: 3.99, season: 'Spring' },
// ])

const makeFarm = async () => {      //one time function
    const farm = new Farm({ name: 'Full Belly Farms', city: 'Guinda, CA' });
    const melon = await Product.findOne({ name: 'Goddess Melon' });
    farm.products.push(melon)       //push to the product
    await farm.save()
    console.log(farm);
}

const addProduct = async () => {
    const farm = await Farm.findOne({ name: 'Full Belly Farms' });
    const watermelon = await Product.findOne({ name: 'Sugar Baby Watermelon' });
    farm.products.push(watermelon);     //only the ObjectId shows in the product, 2 IDs here in an array
    await farm.save();
    console.log(farm);
}


Farm.findOne({ name: 'Full Belly Farms' })
    .populate('products')       //populate the products field, now it will show with product information rather than id
    .then(farm => console.log(farm))
  
