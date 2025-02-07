

function NotFound() {
  return (
    <div className="bg-indigo-900 relative overflow-hidden h-screen">

  <img
    src="https://external-preview.redd.it/4MddL-315mp40uH18BgGL2-5b6NIPHcDMBSWuN11ynM.jpg?width=960&crop=smart&auto=webp&s=b98d54a43b3dac555df398588a2c791e0f3076d9"
    className="absolute h-full w-full object-cover"
  />
</div>

  )
}

export default NotFound



















// const addItemToCart = async (req, res) => {


//   const { itemId, quantity } = req.body;
//   const userId = req.user.id; // JWT token ton user id

//   if (!itemId || !quantity) {
//     return res.status(400).json({ message: "Product ID and quantity are required" });
//   }

//   try {
//     // Step 1: Product details fetch karo
//     const item = await Mobile.findById(itemId);
//     if (!item) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // Step 2: Cart check karo, already hai ya nahi
//     let cartItem = await Cart.findOne({ userId, "item.id": itemId });

//     if (cartItem) {
//       // If exists, update quantity
//       cartItem.quantity += quantity;
//       await cartItem.save();
//       return res.status(200).json({ message: "Cart updated successfully!", cart: cartItem });
//     } else {
//       // If new, save with item details
//       const newCartItem = new Cart({
//         userId,
//         item: {
//           id: item._id,
//           price: item.price,
//           name: item.name,
//           image: item.thumbnail,
//         },
//         quantity,
//       });

//       await newCartItem.save();
//       return res.status(201).json({ message: "Item added to cart!", cart: newCartItem });
//     }
//   } catch (error) {
//     console.error("Error adding to cart:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };