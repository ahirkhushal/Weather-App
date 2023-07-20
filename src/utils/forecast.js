const request = require("request");

const forecast = (address, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=6a5bb6753e3ddedd4b30d1192f828983&query=${address}&units=f`;

  request(
    { url, json: true },
    (error, { body: { error: LocationError, current } }) => {
      if (error) {
        callback("unabled to connect to location sevices!");
      } else if (LocationError) {
        callback("unabled to find location");
      } else {
        const {
          weather_descriptions: [weatherdes],
          temperature,
          feelslike,
        } = current;

        callback(
          undefined,
          `${weatherdes}. it is currently ${temperature} degrees out. it is feels like ${feelslike} degrees out.`
        );
      }
    }
  );
};

module.exports = forecast;
