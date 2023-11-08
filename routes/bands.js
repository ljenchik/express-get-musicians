const { Router } = require("express");
const bandsRouter = Router();
const { Band, Musician } = require("../models");

bandsRouter.get("/", async (req, res, next) => {
    try {
        const bands = await Band.findAll({ include: Musician });
        res.json(bands);
    } catch (error) {
        next(error);
    }
});

bandsRouter.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const band = await Band.findByPk(id, { include: Musician });
        res.json(band);
    } catch (error) {
        next(error);
    }
});

module.exports = { bandsRouter };
