import React, { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
  // Fetch and display cart details here

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from your state management or API
    // using userId as 1 by defualt
    axios
      .get(`https://fakestoreapi.com/carts/1`)
      .then((response) => {
        let endpoints = [];
        let productToQunatityMap = new Map();
        response.data.products.forEach((data) => {
          endpoints.push(`https://fakestoreapi.com/products/` + data.productId);
          productToQunatityMap[data.productId] = data.quantity;
        });
        axios
          .all(endpoints.map((endpoint) => axios.get(endpoint)))
          .then((data) => {
            let temp = [];
            data.forEach((product) => {
              temp.push({
                id: product.data.id,
                quantity: productToQunatityMap[product.data.id],
                title: product.data.title,
              });
            });
            setCartItems([...temp]);
          });
      })
      .catch((error) => console.error("Error fetching product details", error));
  }, []);

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.title} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
