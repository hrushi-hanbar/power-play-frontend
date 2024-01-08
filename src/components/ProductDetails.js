import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error fetching product details", error));
  }, [id]);

  const addToCart = () => {
    // Logic to add the product to the cart with the selected quantity
    // using userId as 1 by defualt
    axios.post(`https://fakestoreapi.com/carts`, {
      userId: 1,
      date: Date.now(),
      products: [{ productId: product.id, quantity: quantity }],
    });
    console.log(`Added ${quantity} ${product.title} to the cart`);
    navigate("/");
  };

  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>

      {/* Quantity input */}
      <label htmlFor="quantity">Quantity:</label>
      <input
        type="number"
        id="quantity"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
      />

      {/* Add to cart button */}
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
