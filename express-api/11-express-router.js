//https://expressjs.com/en/guide/routing.html
multiple routers, combine them into a single application, represent routing function


//app.js
const express = require('express');
const app = express();
const shelterRoutes = require('./routes/shelters');
const dogRoutes = require('./routes/dogs');
const adminRoutes = require('./routes/admin')

app.use('/', shelterRoutes);        //prefix with nothing, just /
app.use('/shelters', shelterRoutes);    //prefix with /shelters so the shelterRoutes we can just use /:id to mean /shelters:id
app.use('/dogs', dogRoutes);

app.listen(3000, () => {
    console.log('Serving app on localhost:3000')
})


//shelters.js
const express = require('express');
const router = express.Router();    //capital R

router.get('/', (req, res) => {
    res.send("ALL SHELTERS")
})
router.post('/', (req, res) => {
    res.send("CREATING SHELTER")
})
router.get('/:id', (req, res) => {
    res.send("VIEWING ONE SHELTER")
})
router.get('/:id/edit', (req, res) => {
    res.send("EDITING ONE SHELTER")
})

module.exports = router;    //need to export to use


//dog.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("ALL DOGS")
})
router.get('/:id', (req, res) => {
    res.send("VIEWING ONE DOG")
})
router.get('/:id/edit', (req, res) => {
    res.send("EDITING ONE DOG")
})

module.exports = router;


  
