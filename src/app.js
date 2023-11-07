const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/musicians", async (req, res) => {
    const musicians = await Musician.findAll();
    res.json(musicians);
});

// app.get("/musicians/1", async (req, res) => {
//     const musicians = await Musician.findAll();
//     res.json(musicians[0]);
// });

// app.get("/musicians/2", async (req, res) => {
//     const musicians = await Musician.findAll();
//     res.json(musicians[1]);
// });

// app.get("/musicians/3", async (req, res) => {
//     const musicians = await Musician.findAll();
//     res.json(musicians[2]);
// });

app.get("/bands", async (req, res) => {
    const bands = await Band.findAll();
    res.json(bands);
});

app.get("/musicians/:id", async (req, res) => {
    const { id } = req.params;
    const musician = await Musician.findByPk(id);
    res.json(musician);
});

app.post("/musicians", async (req, res) => {
    await Musician.create({
        name: req.body.name,
        instrument: req.body.instrument,
    });
    const musicians = await Musician.findAll();
    res.json(musicians);
});

app.put("/musicians/:id", async (req, res) => {
    const { id } = req.params;
    const foundMusician = await Musician.findByPk(id);
    await foundMusician.update({
        name: req.body.name,
        instrument: req.body.instrument,
    });
    res.json();
});

app.delete("/musicians/:id", async (req, res) => {
    const { id } = req.params;
    const foundMusician = await Musician.findByPk(id);
    await foundMusician.destroy();
    res.json();
});

module.exports = app;
