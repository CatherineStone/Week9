const bcrypt = require("bcrypt");

const saltRounds = process.env.SALT_ROUNDS;
const User = require("../users/model");

const hashPass = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, parseInt(saltRounds));

        next();
        console.log(hashedPass);
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error });
    };
};

const comparePass = async (req, res, next) => {
    try {
        req.user = await User.findOne({ where: { username: req.body.username } });
        const match = await bcrypt.compare(req.body.password, req.user.password)
        if (!match){
            const error = new Error("Passwords do not match.");
            req.status(500).json({ errorMessage: error.message, error: error });
        }
        next();
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error });
    }
};

module.exports = {
    hashPass,
    comparePass,
}