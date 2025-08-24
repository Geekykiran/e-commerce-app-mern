import { Schema, model } from "mongoose";
const productCategories = [
    'Electronics',
    'Furniture',
    'Clothing',
    'Shoes',
    'Accessories',
    'Beauty & Personal Care',
    'Health & Wellness',
    'Sports & Outdoors',
    'Books',
    'Toys & Games',
    'Groceries',
    'Pet Supplies',
    'Office Supplies',
    'Garden & Outdoor',
    'Jewelry',
    'Baby Products',
    'Musical Instruments',
    'Tools & Hardware',
];

let productSchema = new Schema({
    productName: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        require: true,
        enum: productCategories
    },
    merchant: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Merchant'
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        default: 0
    },
    productImage: {
        type: String,
        default: "https://www.shutterstock.com/image-vector/missing-picture-page-website-design-600nw-1552421075.jpg"
    }
}, { timestamps: true })


let Product = model("Product", productSchema)


export default Product;