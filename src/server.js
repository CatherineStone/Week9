require("dotenv").config();
const express = require("express");

const port = process.env.PORT || 5001;

const userRouter = require("./users/routes")

const User = require("./users/model")

const app = express();

app.use(express.json());

app.use(userRouter);

const syncTables = () => {
    User.sync({ alter: true, force: false });
}

app.get("/health", (req, res) => {
    res.status(200).json({ message: "API is working." })
})

app.listen(port, () => {
    syncTables();
    console.log(`Server is listening on port ${port}.`)
});

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc4MjA2NzI1fQ.sN0r4FnBctBA8tJBkS5z3Fwe7_3lBPMgKHne0QjtydM