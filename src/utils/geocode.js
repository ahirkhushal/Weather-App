const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?types=address&access_token=pk.eyJ1IjoiYXl1c2hrYXZhZCIsImEiOiJja3JlZWluZ2U1bGU1MndvNmtzOTdxb3d5In0.9XIkiozXto2iAXHaONF1fQ&limit=1`;

  request({ url, json: true }, (err, { body: { features, query } }) => {
    if (err) {
      callback("unabled to connect to location sevices!");
    } else if (features.length === 0) {
      callback("unabled to find location");
    } else {
      const placename = query
        .map((name) => `${name[0].toUpperCase()}${name.slice(1)}`)
        .join("/");

      callback(undefined, {
        latitude: features[0].center[0],
        longitude: features[0].center[1],
        Location: features[0].place_name,
        placename,
      });
    }
  });
};

module.exports = geocode;
