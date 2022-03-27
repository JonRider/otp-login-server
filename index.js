const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "https://otp-login-page.herokuapp.com/",
  })
);

app.get("/", (req, res) => {
  res.json("A private API to request and verify One Time Passwords.");
});

app.post("/get-otp", (req, res) => {
  axios
    .post("https://textbelt.com/otp/generate", {
      phone: req.body.phone,
      message: "Your text verification code is $OTP",
      userid: req.body.userid,
      key: process.env.KEY,
    })
    .then((response) => {
      res.json(response.data.success);
    });
});

app.post("/verify-otp/", (req, res) => {
  axios
    .get("https://textbelt.com/otp/verify", {
      params: {
        otp: req.body.otp,
        userid: req.body.userid,
        key: process.env.KEY,
      },
    })
    .then((response) => {
      res.json(response.data);
    });
});

app.listen(process.env.PORT);
