import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import Listing from "./pages/Listing";
import Demo from "./components/Demo";
import Category from "./pages/Category";
export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />}></Route>
        </Route>

        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/demo" element={<Demo />}></Route>

        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/offers" element={<Offers />}></Route>
        <Route path="/category/:categoryName" element={<Category />}></Route>

        <Route
          path="/category/:categoryName/:listingId"
          element={<Listing />}
        ></Route>

        <Route path="create-listing" element={<PrivateRoute />}>
          <Route path="/create-listing" element={<CreateListing />}></Route>
        </Route>

        <Route path="edit-listing" element={<PrivateRoute />}>
          <Route
            path="/edit-listing/:listingId"
            element={<EditListing />}
          ></Route>
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <ToastContainer />
    </>
  );
}
