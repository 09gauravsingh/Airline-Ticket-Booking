import React, { useState } from "react";
import "./Register.css";
import { Row, Col } from "react-bootstrap";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { name, email, password, mobile };
    sessionStorage.setItem("user", JSON.stringify(user));
    alert("Registration successful!");
  };

  return (
    <div className="box1">
      <h2 className="heading">Register</h2>
      <form onSubmit={handleSubmit}>
        <Row>
          <Col md={12}>
        <label className="name">Name</label>
        <input
          className="name1"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        </Col>
        <Col md={12}>
        <label className="name">Email</label>
        <input
          className="name2"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </Col>
        <Col md={12}>
        <label className="name">Password</label>
        <input
          className="name3"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </Col>
        <Col md={12}>
        <label className="name">Mobile</label>
        <input
          className="name4"
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        </Col>
        <Col md={12}>
        <button className="space" type="submit">Register</button>
        </Col>
        </Row>
        <span className="login1">
        <a href="/">Already Registered? Login</a>
      </span>
      </form>
      
    </div>
  );
};

export default Register;
