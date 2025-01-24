import { useContext, useEffect } from "react";
import HomePage from "./Pages/Home";
import AboutPage from "./Pages/AboutPage";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Mobile from "./Pages/Mobile";
import Register from "./Pages/Register";
import Assessories from "./Pages/Assessories";
import SinglePhone from "./Pages/SinglePhone";
import SalePhone from "./Pages/SalePhone";
import NotFound from "./Pages/NotFound";
// import Cart from "./Pages/Cart";
import AddPhone from "./Pages/Admin/AddPhone";
import Dashboard from "./Pages/Admin/Dashboard";
import GetAllUser from "./Pages/Admin/GetAllUser";
import UpdatePhone from "./Pages/Admin/UpdatePhone";
import UpdateSinglePhone from "./Pages/Admin/UpdateSinglePhone";
import { UserContext } from "./Context/UserContext";

function App() {
  const { user, setUser ,userData } = useContext(UserContext);

  useEffect(() => {
    let token = localStorage.getItem("usertoken");
    if (token) {
      setUser(true);
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        {!user && <Route path="/login" element={<Login />} />}
        {user && <Route path="/login" element={<HomePage/>} />}
        <Route path="/register" element={<Register />} />
        <Route path="/mobile" element={<Mobile />} />
        <Route path="/assessories" element={<Assessories />} />
        <Route path="/sale" element={<SalePhone />} />
        {/* <Route path="/cart" element={user ? <Cart /> : <NotFound />} /> */}
        <Route path="/mobile/:id" element={<SinglePhone />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/dashboard" element={userData === true ? <Dashboard />:<HomePage/>} />
        <Route path="/dashboard/addphone" element={userData === true ?<AddPhone />:<HomePage/>} />
        <Route path="/dashboard/getalluser" element={userData === true ? <GetAllUser /> : <HomePage/>} />
        <Route path="/dashboard/updatephone" element={userData === true ?<UpdatePhone /> : <HomePage/>} />
        <Route
          path="/dashboard/updatephone/:id"
          element={userData === true ?<UpdateSinglePhone /> : <HomePage/>}
        />
      </Routes>
    </>
  );
}

export default App;
