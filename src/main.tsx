import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Event from "./components/Event.tsx";
import Login from "./components/Login.tsx";
import TestAuth from "./components/TestAuth.tsx";
import AuthProvider from "./components/context/AuthProvider.tsx";
import AuthRoute from "./components/AuthRoute.tsx";
import Register from "./components/Register.tsx";

const Main = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/events/:eventID" element={<Event />} />
            <Route path="/login" element={<Login />} />
            <Route path="/test" element={<TestAuth />} />
            <Route element={<AuthRoute />}>
              <Route path="/" element={<App />} />
              <Route path="/home" element={<TestAuth />} />
            </Route>
            <Route path="/register" element={<Register />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
