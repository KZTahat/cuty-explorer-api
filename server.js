"use strict";

const expree = require("express"); //to use express library
const cors = require("cors"); //Cross Origin Resource Sharing
const weatherData = require("./data/weather.json"); //Importing weather Data
const { request, response } = require("express");
require("dotenv").config(); //importing .env file

const server = expree(); // server has all properities and methods of express
const PORT = process.env.PORT; // getting PORT value from .env file
server.use(cors()); //to make the server open to any clinte

// http://localhost:3001?city_name=this.state.cityName
server.get("/getweatherinfo", (request, response) => {
  let cityName = request.query.city_name.toLowerCase();
  try{
  let info = [];
  let flag = false;
  weatherData.map((element) => {
    if (element.city_name.toLowerCase() == cityName) {
        flag = true
      info = element.data.map((element2) => {
        return [element2.weather.description, element2.valid_date];
      });
    }
  });
  if (flag == false) {
    info.push("This City Site Weather is not Available");
  }
  response.status(200).send(`${info}`);
}catch(error){
    console.log('Catch is ignored, because there are no errors');
}
});

server.listen(PORT, () => {
  console.log("Listening on PORT 3001");
});

class forcast {
  constructor(description, date) {
      this.description = description,
      this.date = date
  }
}
