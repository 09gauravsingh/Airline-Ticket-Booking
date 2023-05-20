import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import  Register  from "./Components/Register";
import  Login  from "./Components/Login";
import Booking from './Components/Booking';
import "./Components/Login.css";

function App() {
  return (
    <div className="background">
      <SnackbarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/booking" element={<Booking />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </div>
  );
}

export default App;
