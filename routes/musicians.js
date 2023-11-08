const { Router } = require("express");
const musicianRouter = Router();
const { Musician } = require("./../models");

musicianRouter.get("/", async (req, res, next) => {
    try {
        const musicians = await Musician.findAll();
        res.json(musicians);
    } catch (error) {
        next(error);
    }
});

musicianRouter.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const musician = await Musician.findByPk(id);
        res.json(musician);
    } catch (error) {
        next(error);
    }
});

musicianRouter.post("/", async (req, res) => {
    try {
        await Musician.create({
            name: req.body.name,
            instrument: req.body.instrument,
        });
        const musicians = await Musician.findAll();
        res.json(musicians);
    } catch (error) {
        next(error);
    }
});

musicianRouter.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const foundMusician = await Musician.findByPk(id);
        await foundMusician.update({
            name: req.body.name,
            instrument: req.body.instrument,
        });
        const musicians = await Musician.findAll();
        res.json(musicians);
    } catch (error) {
        next(error);
    }
});

musicianRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const foundMusician = await Musician.findByPk(id);
        await foundMusician.destroy();
        const musicians = await Musician.findAll();
        res.json(musicians);
    } catch (error) {
        next(error);
    }
});

musicianRouter.use((err, req, res, next) => {
    console.error(err.stack);
    res.ststus(500).send("Something went wrong!");
});

module.exports = { musicianRouter };
