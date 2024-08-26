const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    productType: {
        type: String,
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.ObjrctId,
        ref: 'Category',
        required: true
    },
    image: {
        type: Buffer,
        contentType: String,
        required: true
    }
}, {timestamps: true});

export default mongoose.model('products', productsSchema);