import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MdDone } from "react-icons/md";



function OrderPage() {
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [landmark, setLandmark] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const navigate = useNavigate();


  function submit(e) {
    if (state === "Select State") {
      alert("Please select a valid state before submitting.");
      return;
    }
    e.preventDefault();
    axios
      .post("https://e-commers-backend-7q8r.onrender.com/user/adress", {
        pincode,
        address,
        city,
        state,
        landmark,
        phoneNo,
      })
      .then((response) => {
        navigate("/order");
        console.log(response.data);
        
      })
      .catch((e) => {
        console.log(e);
          });
      }


  return (
    <div>
      <Navbar/>
      <div className="flex justify-between p-4 bg-gray-200">
        <div>
          <div>1</div>
          <div className="text-blue-950">
          <div>Login</div><div><MdDone/></div>
          </div>
        </div>
        <div>Email</div>
      </div>


      <div className="bg-gray-600 ">
        <div className="flex bg-blue-700 text-white p-4 text-2xl gap-3 font-bold">

        <div>
          2
        </div>
        <div>
          Delivery Adress
        </div>
        </div>
      <form className="flex flex-col gap-4 p-4" onSubmit={submit}>
        <input type="text" placeholder="10-digit mobile number" value={phoneNo}
        onChange={(e)=>{setPhoneNo(e.target.value)}}/>
        <input type="number" placeholder="Pincode"
        
        value={pincode} onChange={(e)=>{setPincode(e.target.value)}}/>
        <input type="text" placeholder="Address" value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
        <input type="text" placeholder="City/District/Town" value={city} onChange={(e)=>{setCity(e.target.value)}}/>
        <select type="text" placeholder="State" value={state} onChange={(e)=>{setState(e.target.value)}}>
        <option value="Select State" >Select State</option>
        <option value="Andaman & Nicobar Islands">Andaman & Nicobar Islands</option>
        <option value="Andhra Pradesh">Andhra Pradesh</option>
        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
        <option value="Assam">Assam</option>
        <option value="Bihar">Bihar</option>
        <option value="Chandigarh">Chandigarh</option>
        <option value="Chhattisgarh">Chhattisgarh</option>
        <option value="Dadra & Nagar Haveli & Daman & Diu">Dadra & Nagar Haveli & Daman & Diu</option>
        <option value="Delhi">Delhi</option>
        <option value="Goa">Goa</option>
        <option value="Gujarat">Gujarat</option>
        <option value="Haryana">Haryana</option>
        <option value="Himachal Pradesh">Himachal Pradesh</option>
        <option value="Jammu & Kashmir">Jammu & Kashmir</option>
        <option value="Jharkhand">Jharkhand</option>
        <option value="Karnataka">Karnataka</option>
        <option value="Kerala">Kerala</option>
        <option value="Ladakh">Ladakh</option>
        <option value="Lakshadweep">Lakshadweep</option>
        <option value="Madhya Pradesh">Madhya Pradesh</option>
        <option value="Maharashtra">Maharashtra</option>
        <option value="Manipur">Manipur</option>
        <option value="Meghalaya">Meghalaya</option>
        <option value="Mizoram">Mizoram</option>
        <option value="Nagaland">Nagaland</option>
        <option value="Odisha">Odisha</option>
        <option value="Puducherry">Puducherry</option>
        <option value="Punjab">Punjab</option>
        <option value="Rajasthan">Rajasthan</option>
        <option value="Sikkim">Sikkim</option>
        <option value="Tamil Nadu">Tamil Nadu</option>
        <option value="Telangana">Telangana</option>
        <option value="Tripura">Tripura</option>
        <option value="Uttarakhand">Uttarakhand</option>
        <option value="Uttar Pradesh">Uttar Pradesh</option>
        <option value="West Bengal">West Bengal</option>

        </select>

        <input type="text" placeholder="Landmark (Optional)" value={landmark} onChange={(e)=>{setLandmark(e.target.value)}}/>
        <button className="bg-green-500 text-white p-2 rounded-md" type="submit" disabled={state === "Select State"}>Deliver Here</button>

      </form></div>



<Footer/>
    </div>
  );
}

export default OrderPage;
