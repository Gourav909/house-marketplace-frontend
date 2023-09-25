import axios from "axios";
const token = "";

export default axios.create({
  baseURL: "http://localhost:3000/", //API in Server
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
