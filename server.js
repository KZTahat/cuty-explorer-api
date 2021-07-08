"use strict";

const expree = require("express"); //to use express library
const cors = require("cors"); //Cross Origin Resource Sharing (for users authorization)
const axios = require("axios"); // for requsting APIs
const weatherData = require("./data/weather.json"); //Importing weather Data
const { request, response } = require("express");
require("dotenv").config(); //importing .env file
const weatherModule = require('./Modules/weather');//importing weather module from modules
const moviesModule = require('./Modules/movies');//importing movies module from modules

const server = expree(); // server has all properities and methods of express
const PORT = process.env.PORT; // getting PORT value from .env file
server.use(cors()); //to make the server open to any clinte


// http://localhost:3001?city_name=this.state.searchQuery
server.get("/weather", weatherModule.weatherBitHandler);

// http://localhost:3001?api_key=<>$city_name=this.state.searchQuery
server.get("/movies", moviesModule.moviesHandler);

// start listening on PORT
server.listen(PORT, () => {
  console.log("Listening on PORT 3001");
});