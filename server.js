const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const express = require('express');
const cors = require('cors');
const mentorRoute = require('./route/mentorRoute');
const bookingRoute = require('./route/bookingRoute');
const userRoute = require("./route/userRoute");

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/mentor', mentorRoute);
app.use('/api/booking', bookingRoute);
app.use('/api/user', userRoute);

app.get("/", (req, res) => {
    res.send("Home Page");
  });


const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));