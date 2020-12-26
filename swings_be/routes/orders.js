const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
router.post('/order', async (req, res) => {
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email,
        order: req.body.order,
        total: req.body.total,
    });
    await order.save()
    .then(order => {
        res.status(201).json({
            message: order
        });
    })
    .catch(error => {
        res.status(500).json({
            error: error
        });
    })
})

router.get("/allOrder",async (req, res) => {
    const orders = await Order.find()
    if (orders){
        res.status(201).json({
            message: orders
        });
    } else {
        res.status(404).json({
            message4: 'Not Found'
        })
    }
});


router.get("/:username",async (req, res) => {
    const orders = await Order.find({ username: req.params.username });
    if (orders){
        res.status(201).json({
            message: orders
        });
    } else {
        res.status(501).json({
            message: 'Not Found'
        })
    }
});

router.get('/getOrder/:id',async (req, res) => {
      const orders = await Order.findById({_id: req.params.id});
      if (orders) {
        res.status(201).json({
            message: orders
        })
      } else {
        res.status(404).json({ 
            message: 'Not found' 
        });
      }
    }
)

router.delete("/:id", async (req, res) => {
    const order = Order.findOne({ _id: req.params.id});
    if (order) {
        const deletedOrder = order.remove();
        res.status(201).json({
            message: deletedOrder
        })
    } else {
        res.status(404).send("Not found")
    }
  });

router.put('/updateOrder/:id', async (req, res) => {
    const orderId = req.params.id
    const orders = await Order.findById({_id:orderId})
    if (orders){
        //orders.order = req.body.order;
        //orders.address = req.body.address
        orders.isOrderCompleted = true
        const updateOrder = await orders.save()
        res.status(201).json({
            message: updateOrder
        })
    } else {
        res.status(201).json({
            message: 'Not Found'
        })
    }
});

module.exports = router;