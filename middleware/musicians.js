const { check } = require("express-validator");
module.exports = {
    addMusicianValidation: [
        check("name").not().isEmpty().trim(),
        check("instrument").not().isEmpty().trim(),
        check("name").isLength({ max: 20, min: 2 }),
        check("instrument").isLength({ max: 20, min: 2 }),
    ],
};
