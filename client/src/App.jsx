import "./globals.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Auth/Auth_Pages/SignUp"
import SignIn from "./Auth/Auth_Pages/SingIn"
import Auth from "./Auth/Auth"
import Home from "./Root/Pages/Home"
import Contact from "./Root/Pages/Contact"
import Cart from "./Root/Pages/Cart"
import Like from "./Root/Pages/Like"
import Products from "./Root/Pages/Products"
import Orders from "./Root/Pages/Orders"
import Root from "./Root/Root"
import NotFound from "./Root/Pages/NotFound";
import { Toaster } from "react-hot-toast";
import Dashboard from "./Root/Pages/Admin/AdminPages/Dashboard";
import AddProducts from "./Root/Pages/Admin/AdminPages/AddProducts";
import SendEmail from "./Root/Pages/Admin/AdminPages/SendEmail";
import ProductItem from "./Root/Pages/ProductItem";
import ProductManagement from "./Root/Pages/Admin/AdminPages/ProductManagement";
import Notification from "./Root/Pages/Admin/AdminPages/Notification";
import Profile from "./Root/Pages/Profile";
import EditProduct from "./Root/Pages/Admin/AdminPages/EditProduct";
import AdminRoot from "./Root/Pages/Admin/AdminRoot";


const App = () => {


  return (
    <>
      <main className="h-screen flex">
        <Routes>
          <Route element={<Root />}>
            <Route index element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/likes" element={<Like />} />
            <Route path="/p/:id" element={<ProductItem/>} />
            <Route path="/account" element={<Profile />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
          <Route element={<AdminRoot/>} >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-product" element={<AddProducts />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/product-management" element={<ProductManagement />} />
            <Route path="/notification" element={<Notification />} />
          </Route>
          <Route element={<Auth />}>
            <Route element={<SignIn />} path="/sign-in" />
            <Route element={<SignUp />} path="/sign-up" />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Toaster position="top-center" />
    </>
  );
};

export default App;
