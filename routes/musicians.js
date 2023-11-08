const { Router } = require("express");
const musicianRouter = Router();
const { Musician } = require("./../models");

musicianRouter.get("/", async (req, res) => {
    const musicians = await Musician.findAll();
    res.json(musicians);
});

musicianRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const musician = await Musician.findByPk(id);
    res.json(musician);
});

musicianRouter.post("/", async (req, res) => {
    await Musician.create({
        name: req.body.name,
        instrument: req.body.instrument,
    });
    const musicians = await Musician.findAll();
    res.json(musicians);
});

musicianRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const foundMusician = await Musician.findByPk(id);
    await foundMusician.update({
        name: req.body.name,
        instrument: req.body.instrument,
    });
    const musicians = await Musician.findAll();
    res.json(musicians);
});

musicianRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const foundMusician = await Musician.findByPk(id);
    await foundMusician.destroy();
    const musicians = await Musician.findAll();
    res.json(musicians);
});

module.exports = { musicianRouter };
