// functions/cities.js

exports.handler = async (event, context) => {
    const cities = require('./data/cities.json');

    return {
        statusCode: 200,
        body: JSON.stringify(cities),
    };
};
