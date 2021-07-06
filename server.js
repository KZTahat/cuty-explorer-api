"use strict";

const expree = require("express"); //to use express library
const cors = require("cors"); //Cross Origin Resource Sharing
const axios = require("axios"); // for requsting APIs
const weatherData = require("./data/weather.json"); //Importing weather Data
const { request, response } = require("express");
require("dotenv").config(); //importing .env file

const server = expree(); // server has all properities and methods of express
const PORT = process.env.PORT; // getting PORT value from .env file
server.use(cors()); //to make the server open to any clinte

// http://localhost:3001?city_name=this.state.searchQuery
// server.get("/getforcastinfo", forcastHandler);

// http://localhost:3001?city_name=this.state.searchQuery
server.get("/weather", weatherBitHandler);

// http://localhost:3001?api_key=<>$city_name=this.state.searchQuery
server.get("/movies", moviesHandler);

//Function Handlers
// function forcastHandler(request, response) {
//   let searchQuery = request.query.city_name.toLowerCase();

//   let info = [];
//   let flag = false;
//   weatherData.map((element) => {
//     if (element.city_name.toLowerCase() == searchQuery) {
//       flag = true;
//       info = element.data.map((element2) => {
//         return [element2.weather.description, element2.valid_date];
//       });
//     }
//   });
//   if (flag == false) {
//     info.push("This City Site Weather is not Available");
//   }
//   try {
//     response.status(200).send(`${info}`);
//   } catch (error) {
//     console.log(error);
//   }
// }

// Weahter handler function
function weatherBitHandler(request, response) {
  let cityName = request.query.city_name;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${process.env.WEATHER_API_KEY}`;

  axios
    .get(url)
    .then((element) => {
      console.log(element.data);
      response.send(element.data);
    })
    .catch((error) => {
      response.status(500).send(error);
    });
}

function moviesHandler(request, response) {
  let cityName = request.query.city_name;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&query=${cityName}`;
  let arrayOfMovies = [];
  axios
    .get(url)
    .then((element) => {
      element.data.results.map((movie) => {
        arrayOfMovies.push({
          title: movie.original_title,
          overview: movie.overview,
          vote_average: movie.vote_average,
          vote_count: movie.vote_count,
          poster_path: movie.poster_path,
          popularity: movie.popularity,
          release_date: movie.release_date
        });
      });
      response.send(arrayOfMovies);
    })
    .catch((error) => {
      response.status(500).send(error);
    });
}

class forcast {
  constructor(description, date) {
    (this.description = description), (this.date = date);
  }
}

server.listen(PORT, () => {
  console.log("Listening on PORT 3001");
});
