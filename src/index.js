const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const mongoDBConnection = require("./connection");

const app = express();

mongoDBConnection();

const PORT = 8080;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});

module.exports = { app };
