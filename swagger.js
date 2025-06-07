const swaggerAutogen = require("swagger-autogen")();
const dotenv = require("dotenv");
dotenv.config();

const isDev = process.env.NODE_ENV === "development";
const doc = {
  info: {
    title: "aoe-2-api",
    description: "API for cataloging game stats for Age of Empires",
  },
  host: isDev ? "localhost:3000" : "aoe2api.onrender.com",
  schemes: isDev? "http" : "https",
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
