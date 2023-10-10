const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const helmet = require("helmet");

dotenv.config();
const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
db.mongoose
  .connect(`<ADD YOUR MONGOBD ATLAS LINK>`, {  // NOTE IF YOUR PASSWORDS CONTAINS ANY SPECIAL CHAR THEN USE URIENCODEAND THEN PASS YOUR PASSWORD FROM THAT: YOU CAN FIND MORE INFO ON STACKOVERFLOW.
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Farmarts Application for storing files and URL Shortner. Made by Prahalad Singh" });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/S3.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
