//an extremely large number (used for emphasis)


const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/relationshipDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

const userSchema = new Schema({
    username: String,
    age: Number
})

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }  //foreign key, the spelling inside of the ref must be the same with the model
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

//example 1
const makeTweets = async () => {
     const user = new User({ username: 'chickenfan99', age: 61 });
     const tweet1 = new Tweet({ text: 'bock bock bock my chickens make noises', likes: 12 });
     tweet1.user = user;
     user.save();
     tweet1.save();     //user appears as object ID
}
    
// makeTweets();

//example 2
 const makeTweets = async () => {
     const user = await User.findOne({ username: 'chickenfan99' })
     const tweet2 = new Tweet({ text: 'bock bock bock my chickens make noises', likes: 1239 });
     tweet2.user = user;
     tweet2.save();     //user appears as object ID
}

// makeTweets();

const findTweet = async () => {
    const t = await Tweet.find({}).populate('user')  //populate the name of the field (property) you want to populate, now user has name and age, have appropriate user fills in (previously just id)
    console.log(t);                             //populate returns the whole objects, populate('user', 'username'), populate the user but only get the username object not others, restrict to names
   
}

findTweet();
