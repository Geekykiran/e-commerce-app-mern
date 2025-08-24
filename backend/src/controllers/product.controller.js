import Product from "../models/product.model.js";

export const addProduct=async (req,res,next)=>{
   try {
      let merchantId=req.merchant.id
      let {productName,description,price,quantity,category}=req.body
      let product=await Product.create({
         productName,
         description,
         price,
         quantity,
         category,
         merchant:merchantId
      })
      res.status(201).json(product)
   } catch (error) {
      res.status(500).json(error.message)
   }
}

//get products based on merchant
export const getProductsByMerchant=async (req,res,next)=>{
   try {
      let productsByMerchant=await Product.find({merchant:req.merchant.id})
      res.status(201).json(productsByMerchant)
   } catch (error) {
      res.status(500).json(error.message)
   }
}

//get products
export const getProducts=async (req,res,next)=>{
   try {
      let products=await Product.find()
      res.status(201).json(products)
   } catch (error) {
      res.status(500).json(error.message)
   }
}

//get product
export const getProduct=async (req,res,next)=>{
   try {
      let product=await Product.findById({_id:req.params.id})
      res.status(201).json(product)
   } catch (error) {
      res.status(500).json(error.message)
   }
}

export const updateProduct=async (req,res,next)=>{
   try {
      let productId=req.params.id
      let merchantId=req.merchant.id
      let existingProduct=await Product.findOne({_id:productId})
      if(merchantId!==existingProduct.merchant){
         res.status(400).json({message:"product not found"})
         return;
      }
      existingProduct=await Product.findByIdAndUpdate({_id:productId},{...req.body},{new:true})
      res.status(201).json(existingProduct)
   } catch (error) {
      res.status(500).json(error.message)
   }
}

//delete product
export const deleteProduct=async (req,res,next)=>{
   try {
      let productId=req.params.id
      let merchantId=req.merchant.id
      let existingProduct=await Product.findOne({_id:productId})
      if(merchantId!==existingProduct.merchant){
         res.status(400).json({message:"product not found"})
         return;
      }
      await Product.findByIdAndDelete({_id:productId})
      res.status(204).json({message:"Product deleted successfully"})
   } catch (error) {
      res.status(500).json(error.message)
   }
}