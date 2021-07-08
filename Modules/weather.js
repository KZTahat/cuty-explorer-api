"use strict";
const axios = require("axios"); // for requsting APIs

const utilities = {};
let inMemory = {};

// Weahter handler function
utilities.weatherBitHandler = function (request, response) {
  let cityName = request.query.city_name;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${process.env.WEATHER_API_KEY}&days=5`;

  if (inMemory[cityName] !== undefined) {
    console.log("gteting from Memory");
    response.send(inMemory[cityName]);
  } else {
    axios
      .get(url)
      .then((element) => {
        console.log(element.data.data);
        let weatherInfo = element.data.data.map((element2) => {
          return new Forcast(element.data, element2);
        });
        inMemory[cityName] = weatherInfo;
        console.log("hit the server");
        response.send(weatherInfo);
      })
      .catch((error) => {
        response.status(500).send(error);
      });
  }
};

class Forcast {
  constructor(info1, info) {
    (this.lat = info1.lat),
      (this.lon = info1.lon),
      (this.low_temp = info.low_temp),
      (this.valid_date = info.valid_date),
      (this.high_temp = info.high_temp),
      (this.description = info.weather.description);
  }
}

module.exports = utilities;
