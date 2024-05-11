import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Auth from "./Auth";
import ContactUs from "./ContactUs";
import PrivecyPolicy from "./PrivecyPolicy";
import RefundPolicy from "./RefundPolicy";
import ShippingPolicy from "./ShippingPolicy";
import Terms from "./Terms";
import Navbar from "./Navbar";
import Home from "./Home";
import ProductPage from "./ProductPage";
import BuyNow from "./BuyNow";


function App() {
  const login = async () => {
    const CLIENT_ID = "14168416091898906021";
    const redirectURL = "http://localhost:3000/auth";
    // const redirectURL ="https://varietyheaven.in/"
    const AUTH_URL = `https://auth.phone.email/log-in?client_id=${CLIENT_ID}&redirect_url=${redirectURL}`;

    window.open(
      AUTH_URL,
      "VARIETY HEAVEN",
      "toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0, width=500, height=560, top=" +
        (window.screen.height - 600) / 2 +
        ", left=" +
        (window.screen.width - 500) / 2
    );
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar/>}>
          <Route path="" element={<Home />} />
          <Route path="productpage" element={<ProductPage />} />
          {/* <Route path="cart" element={<UserCart products={products} />} /> */}
          {/* <Route path="profile" element={<Profile />} /> */}
          {/* <Route path="login" element={<LoginPhone />} /> */}
          <Route path="contactus" element={<ContactUs />} />
          <Route path="terms" element={<Terms/>} />
          <Route path="privecypolicy" element={<PrivecyPolicy />} />
          <Route path="cancelationpolicy" element={<RefundPolicy />} />
          <Route path="shippingpolicy" element={<ShippingPolicy />} />
          <Route path="buy" element={<BuyNow />} />
          {/* <Route path="payment" element={<Payment />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
