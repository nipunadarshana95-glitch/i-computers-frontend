import { useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { LuListCollapse } from "react-icons/lu";
import { Link } from "react-router-dom";
import UserData from "./userData";

export default function Header() {
    const [sideBarOpen, setSideBarOpen] = useState(false);
    return (
        <header className="w-full h-[100px] bg-accent flex relative">
            <LuListCollapse onClick={() => setSideBarOpen(true)} className="text-white my-auto text-2xl ml-6 lg:hidden" />
            <img src="/logo.png" className="h-full" alt="logo" />
            <div className="w-full h-full hidden lg:flex text-xl text-primary justify-center items-center gap-[30px]">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                
                {/* 🛠️ පිරිසිදු /about රූට් එකට යන Link එකක් බවට නැවත හැදුවා */}
                <Link to="/about" className="hover:text-cyan-300 transition-all">About</Link>
                
                <Link to="/contact">Contact</Link>
            </div>
            <div className="absolute right-24 top-0 h-full items-center hidden lg:flex">
                <UserData />
            </div>
            <Link to="/cart" className="absolute right-4 top-1/2 -translate-y-1/2 text-primary text-2xl">
                <BiShoppingBag />
            </Link>
        </header>
    );
}
