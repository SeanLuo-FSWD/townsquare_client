import dotenv from "dotenv";
dotenv.config();

console.log('aaaaaaaaaaaaaaaaaaaaaaaa____API_URL');

const API_URL = process.env.REACT_APP_API_URL + "/api";
console.log(API_URL);

export default API_URL;
