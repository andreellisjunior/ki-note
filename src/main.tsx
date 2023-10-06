import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Event from "./components/Event.tsx";
import Login from "./components/Login.tsx";
import AuthProvider from "./components/context/AuthProvider.tsx";
import PasswordReset from "./components/PasswordReset.tsx";
import UpdatePassword from "./components/UpdatePassword.tsx";

const Main = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/events/:eventID" element={<Event />} />
            <Route path="/login" element={<Login />} />
            <Route path="/passwordreset" element={<PasswordReset />} />
            <Route path="/update-password" element={<UpdatePassword />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
