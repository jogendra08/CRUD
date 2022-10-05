const express = require('express');
const Product = require('./models/Product');

const router = express.Router();

const { body, validationResult } = require("express-validator");

//  ROUTE 1 : Get all the product using: GET "/api/product/fetchallproduct". login req
router.get('/fetchallproducts',async (req, res) => {
    try {
        let {page, limit, sort, asc}= req.query
        if (!page) page=1;
        if(!limit) limit=10;

        const skip = (page-1)*10;
        const products = await Product.find().sort({[sort]: asc}).skip(skip).limit(limit);
        res.send({page: page, limit: limit, products:products})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//  ROUTE 2 : Add a new product using: POST "/api/products/addproduct". login req
router.post('/addproduct', [
    body('product_id', 'Enter a valid product_id').isLength({ min: 1 }),
    body('productName', 'productName must be atleast 2 character').isLength({ min: 2 }),
    body('category', 'Enter a valid category').isLength({ min: 2 }),
    body('category_id', 'Enter a valid category_id').isLength({ min: 1 }),], async (req, res) => {
        try {
            const {product_id, productName, category, category_id} = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const data = new Product({
                product_id, productName, category, category_id
            })
            const savedProduct = await data.save()

            res.json(savedProduct)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

//  ROUTE 3 : Add a new product using: PUT "/api/product/update". login req
router.put('/updateproduct/:id', async (req, res) => {
   
    const {product_id, productName, category, category_id} = req.body;
    try {
        // Create a newProduct object
        const newProduct = {};
        if (product_id) { newProduct.product_id = product_id };
        if (productName) { newProduct.productName = productName };
        if (category) { newProduct.category = category };
        if (category_id) { newProduct.category_id = category_id };
        
        // Find product to be updated and update it
        let product = await Product.findById(req.params.id);
        if (!product) { return res.status(404).send("Not Found") }


        product = await Product.findByIdAndUpdate(req.params.id, { $set: newProduct }, { new: true })
        res.json({ product });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

//  ROUTE 3 : delete a Product using: DELETE "/api/product/deleteproduct". login req
router.delete('/deleteproduct/:id', async (req, res) => {
    try {
        // Find product to be delete and deleted it
        let product = await Product.findById(req.params.id);
        if (!product) { return res.status(404).send("Not Found") }

        product = await Product.findByIdAndDelete(req.params.id)
        res.json({ "Success": "product has been deleted", product: product });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})



module.exports = router