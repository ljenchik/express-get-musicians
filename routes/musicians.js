const { Router } = require("express");
const musicianRouter = Router();
const controller = require("./../controllers/musicians");
const { addMusicianValidation } = require("../middleware/musicians");

musicianRouter.get("/", controller.allMusicians);
musicianRouter.get("/:id", controller.musicianWithId);
musicianRouter.post("/", addMusicianValidation, controller.addMusician);
musicianRouter.put("/:id", addMusicianValidation, controller.updateMusician);
musicianRouter.delete("/:id", controller.deleteMusician);

musicianRouter.use((err, req, res, next) => {
    console.error(err.stack);
    res.ststus(500).send("Something went wrong!");
});

module.exports = { musicianRouter };
