// import React, { useEffect, useState } from "react";
// import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// import Card from "../components/Card"
function Assessories() {
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/mobile/")
  //     .then((response) => {
  //       setLoading(false)
  //       setIphone(response.data);
  //       // console.log(setIphone)
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // },[]);

  return (
    <>
     <div className="h-screen flex flex-col justify-between">
      <Navbar/>
  
    
    <Footer/>
    </div>
    </>
  );
}

export default Assessories;
