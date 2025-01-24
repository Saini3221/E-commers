import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import Footer from "../../components/Footer";
import { useNavigate, useParams } from "react-router-dom";

function UpdateSinglePhone() {
  const [phoneName, setPhoneName] = useState("");
  const [price, setPrice] = useState("");
  const [phoneStock, setPhoneStock] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:8000/mobile/findSingle", { headers: { id } })
      .then((response) => {
        const data = response.data;
        setPhoneName(data.phoneName || "");
        setPrice(data.price || "");
        setPhoneStock(data.phoneStock || "");
        setThumbnail(data.thumbnail || "");
        setBrand(data.brand || "");
        setDescription(data.description || "");
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();

    await axios
      .put(
        "http://localhost:8000/mobile/upDateMobile",
        { phoneName, phoneStock, price, thumbnail, description, brand },
        { headers: { id } }
      )
      .then(() => {
       
        alert("Phone updated successfully!");
        navigate("/dashboard");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="h-screen flex flex-col justify-between">
      <Navbar />
      <form onSubmit={submit}>
        <div className="flex h-full flex-col justify-center items-center ">
          <input
            type="text"
            value={phoneName}
            className="w-[30%] h-12 m-2"
            placeholder="Name"
            onChange={(e) => setPhoneName(e.target.value)}
          />
          <input
            type="number"
            value={phoneStock}
            className="w-[30%] h-12 m-2"
            placeholder="Stock"
            onChange={(e) => setPhoneStock(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            className="w-[30%] h-12 m-2"
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="Thumbnail"
            value={thumbnail}
            className="w-[30%] h-12 m-2"
            onChange={(e) => setThumbnail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Brand"
            value={brand}
            className="w-[30%] h-12 m-2"
            onChange={(e) => setBrand(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            className="w-[30%] h-12 m-2"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-black px-8 py-2 text-white flex justify-center items-center"
          >
            Update Phone
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default UpdateSinglePhone;
