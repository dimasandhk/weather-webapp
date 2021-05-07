const request = require("request");
const dotenv = require("dotenv");
dotenv.config();

const forecast = (lati, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.ACCESSKEY}&query=${long},${lati}&units=m`;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (body.error) {
      callback("Location not found", undefined);
    } else {
      callback(undefined, body);
    }
  });
};

module.exports = forecast;
