const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { musicianRouter } = require("./../routes/musicians");
const { bandsRouter } = require("./../routes/bands");

app.use("/musicians", musicianRouter);
app.use("/bands", bandsRouter);

module.exports = app;
