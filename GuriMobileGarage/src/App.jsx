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
import Cart from "./Pages/Cart";
import AddPhone from "./Pages/Admin/AddPhone";
import Dashboard from "./Pages/Admin/Dashboard";
import GetAllUser from "./Pages/Admin/GetAllUser";
import UpdatePhone from "./Pages/Admin/UpdatePhone";
import UpdateSinglePhone from "./Pages/Admin/UpdateSinglePhone";
import { UserContext } from "./Context/UserContext";
import Orders from "./Pages/Admin/Orders";
import CartNotLogin from "./Pages/CartNotLogin";
import OrderPage from "./Pages/OrderPage";

function App() {
  const { user, setUser, setUserData, userData } = useContext(UserContext);

  useEffect(() => {
    let token = localStorage.getItem("usertoken");
    let role = localStorage.getItem("role");
    if (token) {
      setUser(true);
    }

    if (token && role === "admin") {
      setUser(true);
      setUserData(true);
    }

    }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        {!user && <Route path="/login" element={<Login />} />}
        {user && <Route path="/login" element={<HomePage />} />}
        <Route path="/register" element={<Register />} />
        <Route path="/mobile" element={<Mobile />} />
        <Route path="/assessories" element={<Assessories />} />
        <Route path="/sale" element={<SalePhone />} />
        <Route path="/cart" element={user ? <Cart /> : <CartNotLogin />} />
        <Route path="/orderpage" element={user ? <OrderPage /> : <NotFound />} />
        <Route path="/mobile/:id" element={<SinglePhone />} />
        <Route path="/*" element={<NotFound />} />
        <Route
          path="/dashboard"
          element={userData === true ? <Dashboard /> : <HomePage />}
        />
        <Route
          path="/dashboard/addphone"
          element={userData === true ? <AddPhone /> : <HomePage />}
        />
        <Route
          path="/dashboard/getalluser"
          element={userData === true ? <GetAllUser /> : <HomePage />}
        />
        <Route
          path="/dashboard/updatephone"
          element={userData === true ? <UpdatePhone /> : <HomePage />}
        />
        <Route
          path="/dashboard/orders"
          element={userData === true ? <Orders /> : <HomePage />}
        />
        <Route
          path="/dashboard/updatephone/:id"
          element={userData === true ? <UpdateSinglePhone /> : <HomePage />}
        />
      </Routes>
    </>
  );
}

export default App;
