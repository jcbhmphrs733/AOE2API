const router = require("../routes");

router;
const buildHome = async (req, res) => {
  //#swagger.ignore = true
  res.send(
    `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AOE2API</title>
    <link rel="stylesheet" href="/styles/styles.css">
    <link rel="icon" type="image/x-icon" href="/images/favicon.ico">
</head>
<body>
<div class="content"> 
<h1>Welcome, ${
      req.session.user !== undefined
        ? `${req.session.user.username}!`
        : "guest!"
    } </h1>
<p>This is a RESTful API for Age of Empires II data. Use the link below to explore the API.</p>
    <a href="/api-docs">Swagger Documentation</a>
  </div>
</body>
</html>`
  );
};

/*----------
Exporting the controller
----------*/

module.exports = {
  buildHome,
};
