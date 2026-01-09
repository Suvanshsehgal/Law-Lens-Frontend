import { Routes, Route } from "react-router-dom";

import App from "./App";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function RouteContainer() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default RouteContainer;
