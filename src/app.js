const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index");
const { db } = require("../db/connection");

const port = 3000;

app.get("/musicians", async (req, res) => {
    const musicians = await Musician.findAll();
    res.json(musicians);
});

app.get("/musicians/1", async (req, res) => {
    const musicians = await Musician.findAll();
    res.json(musicians[0]);
});

app.get("/musicians/2", async (req, res) => {
    const musicians = await Musician.findAll();
    res.json(musicians[1]);
});

app.get("/musicians/3", async (req, res) => {
    const musicians = await Musician.findAll();
    res.json(musicians[2]);
});

app.get("/bands", async (req, res) => {
    const bands = await Band.findAll();
    res.json(bands);
});

module.exports = app;
