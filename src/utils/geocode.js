const request = require("request");

const geocode = (address, callback) => {
  const host = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
  const access_token =
    "pk.eyJ1IjoiZGltYXMtYW5kaGsiLCJhIjoiY2tucjZzYTJwMDZvNzMyb3J4M3dud3RjNCJ9.y4qwU8nSYCY_kIQhjA1PCw";
  const url = `${host}${encodeURIComponent(
    address
  )}.json?access_token=${access_token}&limit=1`;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (!body.features.length) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longtitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
