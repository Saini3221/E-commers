import  { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import axios from 'axios';
import HashLoader from "react-spinners/HashLoader";
import { Link } from 'react-router-dom';


function GetAllUser() {
  const [userData,setUserData]=useState([]);
  const[loding,setLoading] =useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:8000/user")
      .then((response) => {
        setLoading(false)
        setUserData(response.data);
        // console.log(setMobileData)
      })
      .catch((e) => {
        console.log(e);
      });
  },[]);

  return (  <div className="h-screen flex flex-col justify-between">
    {
     loding?<div  className='flex items-center justify-center w-full h-full'>
     <HashLoader color="#36d7b7"  />
     </div>
    : <div className="h-screen flex flex-col justify-between">
     <Navbar/> 
         <div className='text-white flex flex-col justify-center h-full w-full font-bold text-2xl'>
          <div className='flex  justify-between h-full w-[85%] font-bold text-xl'>
            <div className='w-[30%]'>Name</div>
            <div className='w-[30%]'>Password</div>
            <div className='w-[30%]'>Gmail</div>
          </div>
          {userData.map((user)=>(
            <Link to="/" key={user._id} className='flex  justify-between h-full font-bold w-[85%] text-xl'>
              <div className='w-[30%]'>{user.username}</div>
              <div className='w-[30%]'>{user.password}</div>
              <div className='w-[30%]'>{user.email}</div>
                
          </Link>))          }
         </div>
         <Footer/>
    </div>
   }
    </div>
  )
}

export default GetAllUser  