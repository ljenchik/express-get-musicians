const express = require("express");
const app = express();
const { Musician } = require("../models/index");
const { db } = require("../db/connection");

const port = 3000;

app.get("/musicians", async (req, res) => {
    const response = await Musician.findAll();
    res.json(response);
});

module.exports = app;
