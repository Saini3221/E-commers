import { useEffect, useState } from "react";
// import axios from 'axios';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import { Link } from "react-router-dom";

function Cart() {
  // const [totalAmount] = useState(0);
  const [cartData, setCartData] = useState([]);
  const [cartSum, setCartSum] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [loding, setLoading] = useState(true);


  // const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("usertoken"); // Get user ID from local storage or any auth method

  // Fetch the cart items from the API
  useEffect(() => {
    if (!token) return console.log("Please login to view your cart");

    axios
      .get("https://e-commers-backend-7q8r.onrender.com/cart/getcart", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 404) {
          console.log("Cart not found");
        }
        setCartData(response.data.cartItems);
        setCartTotal(response.data.totalAmount);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [token]);

  // Calculate total quantity

  useEffect(() => {
    const totalQty = cartData.reduce((acc, item) => acc + item.quantity, 0);
    setTotalQuantity(totalQty);
  }, [cartData]); // ✅ Run when cartData updates
  
  //Calculate total amount
  useEffect(() => {
    const totalAmount = cartData.reduce((acc, item) => acc + item.item.price * item.quantity, 0);
    setLoading(false);
    setCartSum(totalAmount);}, [cartData]);

  // Remove item from cart API
  const removeItem = async (id) => {
    if (!id) return console.log("Please login to remove items from cart");

    try {
      const response = await axios.delete(
        "https://e-commers-backend-7q8r.onrender.com/cart/removeitemfromcart",
        {
          headers: { id },
        }
      );

      if (response.status === 400) {
        console.log("Product ID is required");
        return;
      }

      alert("Item removed from cart successfully!");

      // ✅ Update cart data and total amount dynamically

      setCartData(response.data.cartItems);
      setCartTotal(response.data.totalAmount);
    } catch (e) {
      console.error("Error removing item from cart:", e);
    }
  };

  const quantityHandler = async (id, quantity) => {
    if (!id) return console.log("Please login to update quantity");

    await axios
      .put(
        "https://e-commers-backend-7q8r.onrender.com/cart/updateitemquantity",
        { quantity }, // ✅ Send quantity in the body
        { headers: { id } } // ✅ Headers go in the third argument
      )
      .then((response) => {
        console.log(response.data);

        // ✅ **Cart Quantity Update**
   
        setCartData((prevCart) =>
          prevCart.map((item) =>
            item._id === id
              ? { ...item, quantity: response.data.cartItem.quantity }
              : item
          )
        );

        // ✅ **Total Price Update**
        setCartTotal(response.data.totalAmount);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Increase and decrease quantity functions
  const increaseQuantity = (id, quantity) => {
    quantityHandler(id, quantity + 1);
  };

  const decreaseQuantity = (id, quantity) => {
    if (quantity > 1) {
      // ✅ Change the condition
      quantityHandler(id, quantity - 1);
    }
  };

  return (
<div className="h-screen flex flex-col justify-between">
{loding ? (
        <div className="flex items-center justify-center w-full h-full">
          <HashLoader color="#36d7b7" />
        </div>
      ) : (


    <div className="h-full flex flex-col justify-between">
      <Navbar />

      <div className="w-full h-full flex gap-[3%]">
        {/* Cart items */}
        <div className="bg-gray-600 w-[65%] px-5 mx-[1%] h-fit flex flex-col items-center">
          {cartData.length > 0 ? (
            cartData.map((cartData) => (
              <div
                key={cartData.item.id}
                className="bg-white w-full p-4 m-2 flex justify-between"
              >
                <div className="flex gap-[3%] w-full">
                  <div className="w-[20%]">
                    <img src={cartData.item.image} alt="product" />
                  </div>

                  <div className="w-[80%]">
                    <div>
                      <h1>Name: {cartData.item.name}</h1>
                      <p>Price: ₹{cartData.item.price}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-4">
                        Quantity:
                        <button
                          onClick={() =>
                            decreaseQuantity(cartData._id, cartData.quantity)
                          }
                          className="bg-red-500 text-white px-3 py-2"
                        >
                          -
                        </button>
                        <p className="text-2xl">{cartData.quantity}</p>
                        <button
                          onClick={() =>
                            increaseQuantity(cartData._id, cartData.quantity)
                          }
                          className="bg-green-500 text-white px-3 py-2"
                        >
                          +
                        </button>
                      </div>

                      <button onClick={() => removeItem(cartData._id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-white">Your cart is empty</h1>
          )}
        </div>

        {/* Price details */}
        <div className="bg-white w-[30%] h-[50%] fixed right-[1%] ">
          <div className="p-[5vh]">
            <div className="font-bold text-gray-500">
              <h1>PRICE DETAILS</h1>
            </div>

            <div className="flex justify-between">
              <div>
                <h1>Price({totalQuantity})</h1>
                <h1>Discount</h1>
                <h1>Delivery Charges</h1>
              </div>
              <div>
                <h1>₹{cartSum}</h1>
                <h1>₹</h1> {/* Example discount */}
                <h1>Free</h1>
              </div>
            </div>

            <div className="font-bold">
              <h1>Total Amount ₹{cartTotal} </h1>{" "}
              <div className="flex justify-end w-full">
                <Link
                  to="/orderpage"
                  className="text-white bg-orange-700 px-[4%] py-[2%]"
                >
                  PLACE ORDER
                </Link>
              </div>

            </div>
          </div>
        </div>
   
      </div>

      <Footer />
    </div>
      )}
</div>
  );
}

export default Cart;
