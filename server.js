//Requirements

const express = require("express");
const mongodb = require("database/database.js");

//App creation
const app = express();
const port = 3000;

//Middleware
app.use(express.static);

//Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Database connection
mongodb.initDb((err) => {
  if (err) {
    console.error("Failed to connect to the database:", err);
    return;
  } else {
    console.log("Database connection established successfully.");
    // Start the server only after successful database connection
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
});
