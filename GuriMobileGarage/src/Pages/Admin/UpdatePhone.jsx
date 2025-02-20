import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
// import { useNavigate} from "react-router-dom";

function UpdatePhone() {
  const [mobileData, setMobileData] = useState([]);
  const [loding, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  // const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://e-commers-backend-7q8r.onrender.com/mobile/")
      .then((response) => {
        setLoading(false);
        setMobileData(response.data);
        // console.log(setMobileData)
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const remove = async (id) => {
    if (!user) {
      alert("Please login to delete the phone");
      return
      
    }
    await axios
      .delete("https://e-commers-backend-7q8r.onrender.com/mobile/deleteMobile", { headers: { id } })
      .then(() => {
        alert("Phone Deleted successfully!");
        // navigate("/dashboard");
        setMobileData(mobileData.filter((item) => item._id !== id));
     
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="h-screen flex flex-col justify-between">
      {loding ? (
        <div className="flex items-center justify-center w-full h-full">
          <HashLoader color="#36d7b7" />
        </div>
      ) : (
        <div className="h-screen flex flex-col justify-between">
          <Navbar />
          <div className="flex  flex-col gap-2 w-full ">
            <div className="flex justify-end items-end w-full">
              <Link
                className="bg-green-600 text-white rounded-md w-[30vh] mx-[4vh] flex justify-center items-center h-[8vh]  "
                to={"/dashboard/addphone"}
              >
                {" "}
                Add New Phone
              </Link>
            </div>
            <div className="bg-slate-500 border flex justify-between px-4 py-1 rounded-md mx-[4vh] flex-col flex-wrap">
              {mobileData.map((mobile) => (
                <div
                  className=" flex bg-slate-200 p-2 rounded-lg  m-[1%] "
                  key={mobile.thumbnail}
                >
                  <div className="w-[30vh]">
                    <img
                      className=" flex justify-center items-center w-[25vh] h-[25vh] "
                      src={mobile.thumbnail}
                      alt="thambnail"
                    />
                  </div>

                  <div className="flex justify-between w-[70%]">
                    <div className="flex flex-col justify-center items-center w-[60%]">
                      <h1>{mobile.name}</h1>
                      <h1>{mobile.brand}</h1>
                      <h1>{"₹" + mobile.price}</h1>
                    </div>
                    <div className="flex flex-col justify-center items-end gap-[1rem] w-[15%]">
                      <button
                        className="bg-red-500 text-white  rounded-lg  my-[1%] w-fit"
                        onClick={() => remove(mobile._id)}

                      >
                        Delete
                      </button>
                      <Link
                        to={`/dashboard/updatePhone/`+mobile._id}
                        className=" bg-blue-600 text-white rounded-lg my[1%] w-fit"
                      >
                        UpDatePhone
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default UpdatePhone;

// {iphone.map((iphone, index) => (

//   <Link to={'/mobile/'+iphone.id } key={iphone.id} className="flex justify-center m-5 shadow-xl">
//     <div className="flex flex-col items-center justify-center ">
//       <img src={iphone.img} alt="card image" className="w-72" />
//       <p>{iphone.name}</p>
//       <p>{iphone.price}</p>

//     </div>
//   </Link>

// ))}
