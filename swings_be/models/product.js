const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        required: true  
    },
    subcategory: {
        type: String,
    },
    price: { 
        type: Number, 
        required: true 
    },
    description: { 
        type: String 
    },
    image: [{
        type: String,
        required: true
    }],
    discount: {
        type: String,
    },
    size: [{
        type: String,
        required: true
    }],
    rating: [
        {
            username: { 
                type: String, 
            },
            score: {
                type: Number
            }
        }
    ],
   
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }, 

});

module.exports = mongoose.model('Product', productSchema);