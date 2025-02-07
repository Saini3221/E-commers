const Cart = require('../model/cartModel'); // Adjust the path as necessary

// Helper function to calculate cart total
const calculateCartTotal = (items) => {
    return items.reduce((total, item) => {
        const itemTotal = (item.price || 0) * (item.quantity || 1); // Handle undefined values
        return total + itemTotal;
    }, 0);
};


// 1. Add item to cart
const Mobile = require('../model/mobileModel'); // Adjust the path as necessary
const addItemToCart = async (req, res) => {


        const { itemId, quantity } = req.body;
        const userId = req.user.id; // JWT token ton user id
      
        if (!itemId || !quantity) {
          return res.status(400).json({ message: "Product ID and quantity are required" });
        }
      
        try {
          // Step 1: Product details fetch karo
          const item = await Mobile.findById(itemId);
          if (!item) {
            return res.status(404).json({ message: "Product not found" });
          }
      
          // Step 2: Cart check karo, already hai ya nahi
          let cartItem = await Cart.findOne({ userId, "item.id": itemId });
      
          if (cartItem) {
            // If exists, update quantity
            cartItem.quantity += quantity;
            await cartItem.save();
            return res.status(200).json({ message: "Cart updated successfully!", cart: cartItem });
          } else {
            // If new, save with item details
            const newCartItem = new Cart({
              userId,
              item: {
                id: item._id,
                price: item.price,
                name: item.name,
                image: item.thumbnail,
              },
              quantity,
            });
      
            await newCartItem.save();
            return res.status(201).json({ message: "Item added to cart!", cart: newCartItem });
          }
        } catch (error) {
          console.error("Error adding to cart:", error);
          res.status(500).json({ message: "Server error" });
        }
      };




      // 2. Get user's cart
      const getCart = async (req, res) => {
        const userId = req.user.id;
        // console.log(userId);
        const cart = await Cart.find({ userId });
        if (!cart) {
          return res.status(404).json({ message: "Cart not found" });
        }

        res.json(cart);
        
      }


const removeItemFromCart = async (req, res) => {
  const _id = req.headers.id;
if (!_id) {
  return res.status(400).json({ message: "Product ID are required" });
}
 // Step 2: Cart check karo, already hai ya nahi
 let cartItem = await Cart.findByIdAndDelete({_id });
res.send(cartItem);

};

// 3. Update item quantity
const updateItemQuantity = async (req, res) => {
   let _id = req.headers.id;
   console.log(_id);
   let quantity = req.body.quantity;
   console.log(quantity);
   
   if (!_id && !quantity) {
       return res.status(400).json({ message: "Product ID and quantity are required" });
   }
    let cartItem = await Cart.findByIdAndUpdate(_id, { quantity: quantity }, { new: true })

    res.send(cartItem);
};



// 4. Remove item from cart

// Exporting the controller functions
module.exports = {
    addItemToCart,
    getCart,
    updateItemQuantity,
    removeItemFromCart
};
