const express = require('express');
const { addItemToCart, getCart, removeItemFromCart, updateItemQuantity } = require('../controllers/cartControllers');
const vrifyToken = require('../Middleware/verfiyToken'); // Adjust the path as necessary



// Adjust the path as necessary
const router = express.Router();

// 1. Add item to cart
router.post('/', vrifyToken, addItemToCart);

// 2. Get user's cart
router.get('/getcart',vrifyToken, getCart);

// 3. Update item quantity
router.put('/updateitemquantity', updateItemQuantity);

// 4. Remove item from cart
router.delete('/removeitemfromcart',removeItemFromCart);

module.exports = router;
