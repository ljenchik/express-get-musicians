const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { Band } = require("./../models");

const { musicianRouter } = require("./../routes/musicians");
app.use("/musicians", musicianRouter);

app.get("/bands", async (req, res) => {
    const allBands = await Band.findAll();
    res.json(allBands);
});

module.exports = app;
