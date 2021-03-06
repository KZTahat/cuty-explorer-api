"use strict";
const axios = require("axios"); // for requsting APIs

let utilities = {};
let inMemory = {};

utilities.moviesHandler = function (request, response) {
  let cityName = request.query.city_name;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&query=${cityName}`;

  if (inMemory[cityName] !== undefined) {
    console.log("gteting from Memory");
    response.send(inMemory[cityName]);
  } else {
    axios
      .get(url)
      .then((element) => {
        let arrayOfMovies = element.data.results.map((movie) => {
          return new Movie(movie);
        });
        inMemory[cityName] = weatherInfo;
        console.log("hit the server");
        response.send(arrayOfMovies);
      })
      .catch((error) => {
        response.status(500).send(error);
      });
  }
};

class Movie {
  constructor(movie) {
    (this.title = movie.original_title),
      (this.overview = movie.overview),
      (this.vote_average = movie.vote_average),
      (this.vote_count = movie.vote_count),
      (this.poster_path = movie.poster_path),
      (this.popularity = movie.popularity),
      (this.release_date = movie.release_date);
  }
}

module.exports = utilities;
