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

const App = () => {

  // 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

  return (
    <>
      <main className="h-screen flex">
          <Routes>
            <Route element={<Root />}>
              <Route index element={<Home />} />
              <Route path="/contact" element={<Contact/>}/>
              <Route path="/cart" element={<Cart />}/>
              <Route path="/like" element={<Like />}/>
              <Route path="/products" element={<Products />}/>
              <Route path="/orders" element={<Orders />}/>
            </Route>
            <Route element={<Auth />}>
              <Route element={<SignIn />} path="/sign-in" />
              <Route element={<SignUp />} path="/sign-up" />
            </Route>
            <Route path="*" element={<NotFound/>} /> 
          </Routes>
      </main>

      <Toaster position="top-center" />
    </>
  );
};

export default App;
