const express = require("express");
const urlRouter = require("./Routers/url");
const connectionDB = require("./connection");

const app = express();
const PORT = 8002;

connectionDB("mongodb://127.0.0.1:27017/url-short")
    .then(() => console.log("successfully connected to mongoDB"))
    .catch((error) => console.log(error));

app.use(express.urlencoded({ extended: true }))
app.use("/url", urlRouter);


app.listen(PORT, () => console.log(`Server is listen on port :${PORT}`));