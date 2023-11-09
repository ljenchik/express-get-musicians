const { Router } = require("express");
const musicianRouter = Router();
const controller = require("./../controllers/musicians");
const { check } = require("express-validator");

musicianRouter.get("/", controller.allMusicians);

musicianRouter.get("/:id", controller.musiciianWithId);

musicianRouter.post(
    "/",
    [
        check("name").not().isEmpty().trim(),
        check("instrument").not().isEmpty().trim(),
        check("name").isLength({ max: 20, min: 2 }),
        check("instrument").isLength({ max: 20, min: 2 }),
    ],
    controller.addMusician
);

musicianRouter.put(
    "/:id",
    [
        check("name").not().isEmpty().trim(),
        check("instrument").not().isEmpty().trim(),
        check("name").isLength({ max: 20, min: 2 }),
        check("instrument").isLength({ max: 20, min: 2 }),
    ],
    controller.updateMusician
);

musicianRouter.delete("/:id", controller.deleteMusician);

musicianRouter.use((err, req, res, next) => {
    console.error(err.stack);
    res.ststus(500).send("Something went wrong!");
});

module.exports = { musicianRouter };
