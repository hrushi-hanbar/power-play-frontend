// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Login from "./components/Login";
import useToken from "./services/useToken";

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" Component={Dashboard} />
        <Route path="/product/:id" Component={ProductDetails} />
        <Route path="/cart" Component={Cart} />
      </Routes>
    </Router>
  );
}

export default App;
