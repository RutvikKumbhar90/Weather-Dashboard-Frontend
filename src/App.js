import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import News from "./components/News.jsx";
import LandingPage from "./components/LandingPage.jsx";
import Home from "./components/Home.jsx";
import Profile from "./components/Profile.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/news" element={<News />} />
        // App.jsx or AppRoutes.jsx
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;
