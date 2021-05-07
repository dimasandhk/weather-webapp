const request = require("request");

const forecast = (lati, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=49113a4a16e82ca70a251870b240d777&query=${long},${lati}&units=m`;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (body.error) {
      callback("Location not found", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature}C degress out, and feels like ${body.current.feelslike}C`
      );
    }
  });
};

module.exports = forecast;
