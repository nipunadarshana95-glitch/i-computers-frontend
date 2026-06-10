import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./productPage";
import ProductOverview from "./productOverview";
import CartPage from "./cart";
import CheckoutPage from "./checkOut";
import OrdersPage from "./ordersPage";
import Home from "./homeContent";
import ContactPage from "./contactPage";

export default function HomePage(){
    return(
        <div className="w-full h-full overflow-y-scroll max-h-full bg-[#0b0f19]">
            {/* Keeping the Header globally here so it stays on every single page */}
            <Header /> 
            
            <div className="w-full min-h-[calc(100%-100px)]">
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/about" element={<Home/>} /> 
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/overview/:productID" element={<ProductOverview/>} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/*" element={<h1>Page not found</h1>} />
                </Routes>
            </div>
        </div>
    )
}