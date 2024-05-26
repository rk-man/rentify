const express = require("express");
const path = require("path");
const cors = require("cors");

const userRouter = require("./routes/userRouter");
const propertyRouter = require("./routes/propertyRouter");
const likeRouter = require("./routes/likeRouter");

const errorHandler = require("./utils/errorHandler");

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(
    express.json({
        limit: "50mb",
    })
);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/properties", propertyRouter);
app.use("/api/v1/likes", likeRouter);

app.use(errorHandler);

module.exports = app;
