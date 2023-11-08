const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { musicianRouter } = require("./../routes/musicians");
app.use("/musicians", musicianRouter);

module.exports = app;
