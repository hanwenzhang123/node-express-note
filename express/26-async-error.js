//handling async errors 
//- https://expressjs.com/en/guide/error-handling.html
//asyc (req, res, next) => {
//if (  ) {         //if something what what what, then return next(error)
//return next(    ) }}   //error handling inside the next()

app.get('/products/:id', async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    if (!product) {     //if the product not exist, error handler
        return next(new AppError('Product Not Found', 404));   //call next error handler if no project, need return
    }
    res.render('products/show', { product })    //product exists
})

app.get('/products/:id/edit', async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        return next(new AppError('Product Not Found', 404));
    }
    res.render('products/edit', { product, categories })
}))


//handling more async errors!
//for async -> try catch 
//- we handle the error so at least the app is not breaking
//like we could have a mongoose issue
//for every async/promise middleware function

app.post('/products', async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
  } catch (e) {
    next(e);
  }
}))

app.put('/products/:id', async (req, res, next) => {
  try {  
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`);
  } catch (e) {
    next(e)
  }
}))

app.get('/products', async (req, res, next) => {
  try {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }
  } catch (e) {
    next (e)
  }
}))

  
