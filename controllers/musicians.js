const { Musician } = require("./../models");
const { validationResult } = require("express-validator");

module.exports = {
    allMusicians: async (req, res, next) => {
        try {
            const musicians = await Musician.findAll();
            res.json(musicians);
        } catch (error) {
            next(error);
        }
    },
    musicianWithId: async (req, res, next) => {
        try {
            const { id } = req.params;
            const musician = await Musician.findByPk(id);
            res.json(musician);
        } catch (error) {
            next(error);
        }
    },

    addMusician: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ error: errors.array() });
        } else {
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
        }
    },
    updateMusician: async (req, res, next) => {
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
    },
    deleteMusician: async (req, res) => {
        try {
            const { id } = req.params;
            const foundMusician = await Musician.findByPk(id);
            await foundMusician.destroy();
            const musicians = await Musician.findAll();
            res.json(musicians);
        } catch (error) {
            next(error);
        }
    },
};
