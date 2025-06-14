import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    code: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String },
    status: { type: Boolean, default: true },
    thumbnails: { type: [String], default: [] }
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema)

export default Product