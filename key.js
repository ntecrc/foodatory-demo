console.log("this is loaded");

require('dotenv').config();
module.exports = {
  F2F_KEY: process.env.foodToFork_CONSUMER_KEY,
};