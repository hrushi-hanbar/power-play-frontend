// AuthService.js
import axios from "axios";

export const login = (username, password) => {
  return axios
    .post(`https://fakestoreapi.com/auth/login`, {
      username: "mor_2314",
      password: "83r5^_",
    })
    .then((response) => {
      console.log("Logged in Sucessfuly", response);
      return username;
    })
    .catch((error) => console.error("Error fetching product details", error));
};
