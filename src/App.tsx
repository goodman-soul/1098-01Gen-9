import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Cart from "@/pages/Cart";
import RentalConfirm from "@/pages/RentalConfirm";
import PurchaseSuccess from "@/pages/PurchaseSuccess";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/rental/confirm" element={<RentalConfirm />} />
        <Route path="/purchase/success" element={<PurchaseSuccess />} />
      </Routes>
    </Router>
  );
}
