const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    product_id:{
        type: String,
        require: true
    },
    productName:{
        type: String,
        require: true
    },
    category:{
        type: String,
        require: true
    },
    category_id:{
        type: String,
        require: true
    }
});

module.exports = mongoose.model('products', ProductSchema)