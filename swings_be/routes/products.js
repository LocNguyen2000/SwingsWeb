const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');
const { route } = require('./admins');

router.get('/category/:category', async (req, res) =>{
    const category = req.params.category;
    const products = await Product.find({category:category})
    if (products) {
        res.status(201).json({
            message: products
        })
    } else {
        res.status(404).json({
            message: 'Not found'
        })
    }
})
router.get('/subcategory/:subcategory', async (req, res) =>{
    const subcategory = req.params.subcategory;
    const products = await Product.find({subcategory: subcategory})
    if (products) {
        res.status(201).json({
            message: products
        })
    } else {
        res.status(404).json({
            message: 'Not found'
        })
    }
})
router.get('/:name', async (req, res,next) => {
    const searchKeyword = req.query.searchKeyword
      ? {
          name: {
            $regex: req.query.searchKeyword,
            $options: 'i',
          },
        }
      : {};
    const products = await Product.find({...searchKeyword })
    if (products){
        res.status(201).json({
            message: products
        })
    } else {
        res.status(404).json({
            message: 'Not found'
        })
    }
});

router.get('/allProduct', async (req, res) => {
    const products = await Product.find()
    if (products){
        res.status(201).json({
            message: products
        })
    } else {
        res.status(500).json({
            error: error
        })

    }
})

router.post('/addProduct', async (req, res) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(), 
        name: req.body.name,
        price: req.body.price,
        description: "",
        image: req.body.image,
        discount: "0",
        category: req.body.category,
        subcategory: req.body.subcategory,
        size: req.body.size,
        rating: [],
    });
    await product.save()
    .then(product => {
        res.status(201).json({
            message: product
        });
    })
    .catch(error => {
        res.status(500).json({
            error: error
        });
    })
});

router.put('/:id',  async (req, res) =>{
    const productId = req.params.id;
    console.log(productId)
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name
      product.price = req.body.price
      product.image = req.body.image
      product.category = req.body.category
      product.description = req.body.description
      product.discount = req.body.discount
      product.subcategory = req.body.subcategory
      product.size = req.body.size
      product.updatedAt = Date.now()
      const updatedProduct = await product.save();
      res.status(201).json({ 
          message: updatedProduct 
        });
    } else {
        res.status(404).json({ 
            message: 'Not Found' 
        });
    }

})

router.put('/rating/:id', async(req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        const rating = {
            username : req.body.username,
            score: Number(req.body.score)
        }
        product.rating= req.body.rating
        const updatedProduct = await product.save()
        res.status(201).json({
            message: updatedProduct
        })
    } else {
        res.status(500).json({
            message: 'Not Found'
        })
    }
})

router.get('/product/:id',async (req, res) => {
    //const product_id = req.params._id
    const product = await Product.findOne({_id: req.params.id})
    console.log(req.params.id)
    if (product) {
        res.status(200).json({
            message: product
        })
    } else {
        res.status(500).json({
            message: 'Not found'
        });
    }
})

router.delete('/:id',  async (req, res) => {
    const deletedProduct = await Product.findById(req.params.id);
    if (deletedProduct) { 
        await deletedProduct.remove()
        res.status(201).json({ 
            message: 'Xóa sản phẩm thành công' 
            
        });
    } else {
        res.status(201).json({
            message: 'Xóa khồn thành công'
        });
    }
});
  


module.exports = router;