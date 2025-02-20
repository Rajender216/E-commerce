import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/UserDashboard";
import PrivateRoute from "./components/Routes/PrivateRoute";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminPrivateRoute from "./components/Routes/AdminPrivateRote";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreatePrdouct from "./pages/Admin/CreatePrdouct";
import UsersDetails from "./pages/Admin/UsersDetails";
import Orders from "./pages/user/Orders";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/user-dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
          <Route path="orders" element={<Orders/>} />
        </Route>
        <Route path="/admin-dashboard" element={<AdminPrivateRoute />}>
          <Route path="" element={<AdminDashboard />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="create-product" element={<CreatePrdouct />} />
          <Route path="update-product/:slug" element={<UpdateProduct />} />
          <Route path="products" element={<Products />} />
        
          <Route path="users" element={<UsersDetails />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
