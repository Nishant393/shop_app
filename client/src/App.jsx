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
import AdminRoot from "./Root/Pages/Admin/AdminRoot";
import { Toaster } from "react-hot-toast";

// <<<<<<< HEAD
// // import Dashboard from "./Root/Pages/Admin/Dashboard";
// import AdminRoot from "./Root/Pages/Admin/AdminRoot";
// =======
// import Dashboard from "./Root/Pages/Dashboard";
// >>>>>>> a066c81 (create Admin Dashboard)

const App = () => {

  // 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
  // https://claude.ai/chat/0cbb999a-db21-4904-ba43-3bff205e443c
  // git reset --hard
  // https://chatgpt.com/c/677e8336-0140-8011-939b-862c76813d3a
// <<<<<<< HEAD
//   // <<<<<<< HEAD
// =======
// >>>>>>> a066c81 (create Admin Dashboard)

  return (
    <>
      <main className="h-screen flex">
        <Routes>
          <Route element={<Root />}>
            <Route index element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/like" element={<Like />} />
            <Route path="/dashboard" element={<AdminRoot />}/>
              {/* <Route path="/dashboard" element={<Like />} /> */}
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
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
