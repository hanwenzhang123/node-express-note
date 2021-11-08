$npm install mongoose --save

```javascript
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/{name of the database}', {useNewUrlParser: true, useUnifiedTopology: true});

const {somethingSchema} = new mongoose.Schema({
  name: String,
  year: Number,
  score: Number,
  review: String
});

const {name} = mongoose.model('{something}', somethingSchema);

const {data} = new {name}({ {key}: {value} });

{data}.save();

```
 
