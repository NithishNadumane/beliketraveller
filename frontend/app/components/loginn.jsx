  "use client";
  import React, { useState } from "react";
  import "./css/check.css";
import axios from "axios";
import { useRouter } from "next/navigation";
  

const Login = ({ onClose, switchtosignup, switchtoforgot }) => {
    const router = useRouter();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
const API = process.env.NEXT_PUBLIC_API_URL;
    async function handlelogin(e) {
      e.preventDefault();
      try {
        const response = await axios.post(`${API}/api/auth/login`, { email, password });

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        onClose();
        window.dispatchEvent(new Event("storage"));
        router.push("/");
      } catch (error) {
        alert(error.response?.data?.message || "Login failed");
      }
    }

    return (
      <div className="modalOverlay" onClick={onClose}>
        <div className="modalBox" onClick={(e) => e.stopPropagation()}>
          <button className="closeBtn" onClick={onClose}>✖</button>
          <h2>Login</h2>
          <form className="loginForm" onSubmit={handlelogin}>
            <input value={email} onChange={(e) => setemail(e.target.value)} type="email" placeholder="Email" required />
           <div className="passwordContainer">
  <input
    value={password}
    onChange={(e) => setpassword(e.target.value)}
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    required
  />
  
  <span
    className="togglePassword"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? "🙈" : "👁️"}
  </span>
</div>
            
            <button type="submit">Login</button>
          </form>
          <p className="forgotText">
    <span onClick={switchtoforgot} className="switchLink">
      Forgot Password?
    </span>
  </p>  
          <p className="switchText">
            New user?{" "}
            <span onClick={switchtosignup} className="switchLink">Signup</span>
          </p>
        </div>
      </div>
    );
  };

  export default Login;
