import axios from "axios";
// import cors from 'cors'
// var express = require('express')

// const app = express()

// app.use(cors)

const api = axios.create({
  baseURL: "http://localhost/api_test_3lm",
});

export default api;