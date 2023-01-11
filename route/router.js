const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth')
const { addBrand } = require("../controller/brand")
const { addProduct } = require("../controller/product")
const { createOrder, getOrderById, deleteOrder, getAllOrder, updateOrdder } = require("../controller/order")

const { registerUser, login } = require("../controller/user")


router.post('/products', authenticate, addProduct);
router.post('/brand', authenticate, addBrand)
router.post('/order', authenticate, createOrder)
router.get('/order', authenticate, getOrderById)
router.get('/allOrder', authenticate, getAllOrder)
router.put('/order', authenticate, updateOrdder)
router.delete('/order', authenticate, deleteOrder)
router.post('/register', registerUser)
router.post('/login', login)

module.exports = router
