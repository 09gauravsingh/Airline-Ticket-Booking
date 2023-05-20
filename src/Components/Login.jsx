import React, { useState } from "react";
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom"; 
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user.email === email && user.password === password) {
      enqueueSnackbar("Login successful!", {variant: "success"});
      navigate("/booking");
    } else {    
      enqueueSnackbar("Invalid email or password or need to register", {variant: "error"});
    }
  };

  return (
    <div className="box">
      <div id="login">Login</div>
      <form onSubmit={handleSubmit}>
        <label className="labelemail">Email</label>
        <input
        className="labelemail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="labelemail">Password</label>
        <input
        className="labelemail"  
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btnn">Login</button>
      </form>
      <div className="register">
        <a href="/register">Need to Register?</a>
        </div>
    </div>
  );
};

export default Login;
