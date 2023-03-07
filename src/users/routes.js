const { Router } = require("express")
const userRouter = Router();

const { hashPass, comparePass, tokenCheck } = require("../middleware/index");

const { registerUser, login, getAllUsers } = require("./controllers");

userRouter.post("/users/register", hashPass, registerUser);
userRouter.post("/users/login", comparePass, login);

//get all users
userRouter.get("/users/getallusers", tokenCheck, getAllUsers); //protected

// update user

// userRouter.put("/users/updateuser", tokenCheck, updateUser);

module.exports = userRouter;