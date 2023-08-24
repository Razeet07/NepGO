const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter procuct name'],
        trim: true,
        maxlength: [200, 'product name cannot exceed 200 characters']

    },

    price: {
        type: Number,
        required: [true, 'please enter procuct price'],
        trim: true,
        maxlength: [5, 'product name cannot exceed 5 characters'],
        default: 0.0
    },

    description: {
        type: String,
        required: [true, 'please enter procuct des'],

    },

    ratings: {
        type: Number,
        default: 0

    },

    images: [
        {
            public_id: {
                type: String,
                required: true
            },

            url: {
                type: String,
                required: true
            },
        }
    ],

    category: {
        type: String,
        required: [true, 'please enter product category'],
        enum: {
            values: [
                'Electronics',
                'Laptop',
                'monitor',
                'CPU',
                'Headphone',
                'Accessories',
                'RAM',
                'Graphics Card',
                'Gaming Chair'
            ],
            message: 'please select correct category for product'
        }
    },
    seller: {
        type: String,
        require: [true, 'please enter procuct selle'],
    },

    stock: {
        type: String,
        require: [true, 'please enter procuct stock'],
        maxlength: [5, 'procuct maxlength is only 5 characters'],
        default: 0
    },

    numOfReview:{
        type: Number,
        default: 0
    },

    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            ratings: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt:{
        type: Date,
        default: Date.now
    }
  
})

module.exports = mongoose.model('procuct', productSchema)