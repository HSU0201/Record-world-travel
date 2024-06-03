exports.handler = async () => {
  const citiesData = require("./data/cities.json");
  return {
    statusCode: 200,
    body: JSON.stringify(citiesData),
  };
};
