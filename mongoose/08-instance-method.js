//{name of the schema}.methods.{name of the function} = function(){ // do something };


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be positive ya dodo!']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }

});


//example 1 - greeting
productSchema.methods.greet = function () {
    console.log("HELLLO!!! HI!! HOWDY!!! ")
    console.log(`- from ${this.name}`)    // - from Mountain Bike
}

const Product = mongoose.model('Product', productSchema);

const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: 'Mountain Bike' });
    foundProduct.greet();
}

findProduct()


//example 2 - toggle the checkbox
productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save();   //we await below
}

const Product = mongoose.model('Product', productSchema);

const findProduct = async () => {
    const foundProduct = await foundProduct.toggleOnSale();    //we return above
    console.log(foundProduct)
}


//example 3 - add category
productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save();
}

const Product = mongoose.model('Product', productSchema);

const findProduct = async () => {
    const foundProduct = await foundProduct.addCategory('Outdoors')
    console.log(foundProduct)
}

  
