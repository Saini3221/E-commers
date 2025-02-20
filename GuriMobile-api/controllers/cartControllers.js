const Cart = require('../model/cartModel');
const Mobile = require('../model/mobileModel');

// Helper function to calculate total amount
const calculateCartTotal = async (userId) => {
    const cartItems = await Cart.find({ userId });
    return cartItems.reduce((total, item) => total + (item.item.price * item.quantity), 0);
};

// **1. Add item to cart**
const addItemToCart = async (req, res) => {
    try {
        const { itemId, quantity } = req.body;
        const userId = req.user.id;

        if (!itemId || !quantity) {
            return res.status(400).json({ message: "Product ID and quantity are required" });
        }

        const item = await Mobile.findById(itemId);
        if (!item) return res.status(404).json({ message: "Product not found" });

        let cartItem = await Cart.findOne({ userId, "item.id": itemId });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            cartItem = await Cart.create({
                userId,
                item: { id: item._id, price: item.price, name: item.name, image: item.thumbnail },
                quantity,
            });
        }

        const totalAmount = await calculateCartTotal(userId);
        res.status(200).json({ message: "Cart updated successfully!", cartItem, totalAmount });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// **2. Get user's cart**
const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cartItems = await Cart.find({ userId });

        if (!cartItems.length) {
            return res.status(404).json({ message: "Cart is empty" });
        }

        const totalAmount = await calculateCartTotal(userId);
        res.json({ cartItems, totalAmount });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// **3. Update item quantity**
const updateItemQuantity = async (req, res) => {
    try {
        const { id } = req.headers;
        const { quantity } = req.body;

        if (!id || !quantity) {
            return res.status(400).json({ message: "Product ID and quantity are required" });
        }

        const cartItem = await Cart.findByIdAndUpdate(id, { quantity }, { new: true });
        if (!cartItem) return res.status(404).json({ message: "Item not found in cart" });

        const totalAmount = await calculateCartTotal(cartItem.userId);
        res.json({ cartItem, totalAmount });
    } catch (error) {
        console.error("Error updating quantity:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// **4. Remove item from cart**
const removeItemFromCart = async (req, res) => {
    try {
        const { id } = req.headers;
        if (!id) return res.status(400).json({ message: "Product ID is required" });

        const cartItem = await Cart.findByIdAndDelete(id);
        if (!cartItem) return res.status(404).json({ message: "Item not found in cart" });

        const totalAmount = await calculateCartTotal(cartItem.userId);
        const cartItems = await Cart.find({ userId: cartItem.userId });

        res.json({ cartItems, totalAmount });
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    addItemToCart,
    getCart,
    updateItemQuantity,
    removeItemFromCart
};
