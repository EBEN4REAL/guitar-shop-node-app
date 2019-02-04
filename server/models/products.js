const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxLength: 100
    },
    description: {
        required: true,
        type: String,
        maxLength: 100000
    },
    price: {
        required: true,
        type: Number,
        maxLength: 
    }

});

const Products = mongoose.model('Products', productsSchema);

module.exports = {Products};