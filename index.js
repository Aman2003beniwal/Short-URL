const express = require("express");
const urlRouter = require("./Routers/url");
const staticRouter = require("./Routers/staticRouter");
const connectionDB = require("./connection");
const path = require("path");
const UserData = require("./Routers/userData")
const app = express();
const cookieParser = require("cookie-parser");
const { restrictToLoggedUserOnly, checkAuth } = require("./middleware/authMiddleware")
const PORT = 8002;

connectionDB("mongodb://127.0.0.1:27017/url-short")
    .then(() => console.log("successfully connected to mongoDB"))
    .catch((error) => console.log(error));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());


app.use("/url", restrictToLoggedUserOnly, urlRouter);
app.use("/userData", UserData);
app.use("/", checkAuth, staticRouter);


// we are using a ejs for server side rendering
app.set("view engine", "ejs");
app.set("views", path.resolve("./Views"));

// app.get("/ejsView", async (req, res) => {
//     const allData = await Url.find({});
//     // console.log(allData);
//     return res.render("Home", {
//         data: allData
//     });
// })

app.listen(PORT, () => console.log(`Server is listen on port :${PORT}`));