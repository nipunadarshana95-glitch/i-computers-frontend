import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import AdminPage from "./pages/adminPage";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ForgetPasswordPage from "./pages/forgetPasswordPage";

function App() {
    return (
        <GoogleOAuthProvider clientId="1060640670620-7l03reuej93uli7kgkhubosbdbdlqmri.apps.googleusercontent.com">
            <BrowserRouter>
                <Toaster position="top-right" />
                <div className="w-full h-screen bg-primary text-secondary ">
                    <Routes>
                        {/* Front-end routes (Home and About both point to HomePage layout) */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<HomePage />} />
                        <Route path="/*" element={<HomePage />} />
                        
                        {/* Auth & Admin routes */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/admin/*" element={<AdminPage />} />
                        <Route path="/forgot-password" element={<ForgetPasswordPage />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
}

export default App;