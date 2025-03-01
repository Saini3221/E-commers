import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";
import HashLoader from "react-spinners/HashLoader";

function SinglePhone() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mobileData, setMobileData] = useState({});
  const [quantity, setQuantity] = useState(1); // Initialize quantity to 1
  const { user } = useContext(UserContext);
  const token = localStorage.getItem("usertoken");
  const itemId = id;
  const [loding, setLoading] = useState(true);
 

  useEffect(() => {
    axios
      .get("https://e-commers-backend-7q8r.onrender.com/mobile/findSingle", { headers: {id} })
      .then((response) => {
        setLoading(false);
        setMobileData(response.data);

      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login to add items to the cart.");
      
      navigate("/login");
      return;
    }

    // Send request to add item to cart with the selected quantity
    axios
      .post("https://e-commers-backend-7q8r.onrender.com/cart/",  { itemId, quantity }, 
        { headers: { Authorization: `Bearer ${token}` }})
      .then((response) => {
        console.log(response.data);
        
        alert("Item added to cart successfully!");
      })
      .catch((error) => {
        if (error.response.status === 404) {
          alert("Product not found");
          // navigate("/login");
          return;
        }
        console.error("Error adding item to cart:", error);
      });
  };

  return (
    <div className="h-screen flex flex-col justify-between"> 
    {loding ? (
      <div className="flex items-center justify-center w-full h-full">
        <HashLoader color="#36d7b7" />
      </div>) : (

        
        <div className="h-screen flex flex-col justify-between">

      <Navbar />

      <div className="flex items-center justify-evenly gap-2 w-[100%] max-[550px]:flex-col text-white">
        <div className="w-[40%] max-[550px]:w-[92%] h-[100%] p-[5vh] flex justify-center items-center bg-white">
          <img
            src={mobileData.thumbnail}
            alt=""
            className="w-[32vh] max-[500px]:w-[35%]"
          />
        </div>
        <div className="flex w-[50%] max-[550px]:w-[92%]">
          <div className="flex flex-col gap-2 justify-evenly">
            <div>
              <p className="font-bold text-[6vh]">{mobileData.phoneName}</p>
              <p className="font-bold text-3xl text-green-500">
                ₹{Number(mobileData.price).toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={decreaseQuantity}
                className="bg-red-500 text-white px-3 py-2"
              >
                -
              </button>
              <p className="text-2xl">{quantity}</p>
              <button
                onClick={increaseQuantity}
                className="bg-green-500 text-white px-3 py-2"
              >
                +
              </button>
            </div>

            <div className="flex justify-start items-center gap-[2vh] rounded-md w-[100%] px-[2vh]">
              <button className="bg-[#fb641b] w-[50%] py-[2vh] px-[2vh] text-white">
                Buy
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-yellow-400 py-[2vh] px-[2vh] w-[50%] text-white"
              >
                Add to Cart
              </button>
            </div>

            <div className="flex justify-start text-white w-[fit]">
              <p>
                <span className="font-bold text-[4vh]">Description:- </span>
                <span>{mobileData.description}</span>
              </p>
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

export default SinglePhone;




// const handleAddToCart = (e) => {
//   e.preventDefault();

//   if (!user) {
//     navigate("/login")
//   } else {
//     dispatch(
//       addToCart({
//         token: user.token,
//         productdata: {
//           productId: product?._id,
//           name: product?.name,
//           image: product?.image,
//           price: product?.price,
//           qty: qty,
//           discount: product?.discount,
//         },
//       })
//     );
//   }

// };