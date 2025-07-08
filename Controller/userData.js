
/*
// this all are created by using json
const Users = require("../models/userData");
const { v4: uuidv4 } = require('uuid');
const { setUser } = require('../services/auth');

async function fetchAllData(req, res) {
    const allData = await Users.find({});
    res.status(200).json({
        status: true,
        message: "All data is fetch successfully...",
        data: allData
    })
}
async function signup(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            status: false,
            message: "All fields (name, email, password) are required"
        });
    }

    const existingEmail = await Users.findOne({ email })
    if (existingEmail) {
        return res.status(400).json({
            status: false,
            message: "Email already exist in a Database, please try with other email"
        })
    } else {
        const newUser = await Users.create({ name, email, password });
        return res.status(201).json({
            status: true,
            message: "User is created successfully",
            data: newUser,
        })
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: false,
            message: "Email and Password are required"
        })
    }

    const findData = await Users.findOne({ email, password })
    // console.log("findData : ", findData);

    if (findData) {

        const sessionId = uuidv4();
        setUser(sessionId, findData);
        res.cookie("uuid", sessionId, {
            httpOnly: true,
            secure: false, // set true if you’re on HTTPS
            maxAge: 24 * 60 * 60 * 1000 // optional: 1 day
        });
        return res.status(200).json({
            status: true,
            message: "Login successfully",
            sessionId,
            data: {
                "email": findData.email,
                "password": findData.password
            }
        })
    } else {
        return res.status(404).json({
            status: false,
            message: "User creditial is wrong,Try again with correct information"
        })
    }
}

module.exports = { signup, login, fetchAllData }
*/


//// using the server side renderin
const Users = require("../models/userData");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../services/auth");

async function fetchAllData(req, res) {
    const allData = await Users.find({});
    res.json({
        allData
    })
}
async function signup(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.send("Name,email,password all fields are required...");
    }

    const data = await Users.create({ name, email, password });
    // console.log(data)
    res.render("Home")



}

async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render("login", { message: "emial and password are required" });
    }

    const user = await Users.findOne({ email, password });
    // console.log("user", user)
    if (!user) {
        return res.render("login", { message: "Invalid email or password!" });
    }

    // return res.render("/userData", { message: "Login successful!", user });


    // here we are using statefull authencation
    // setting the cookies  by using the auth.js
    // const sessionId = uuidv4();
    //setUser(sessionId, user); // setting the user in auth.js with sessionId(uuid) and user that is login (email+password)
    //res.cookie("uuid", sessionId); // it is  sets a cookie in the response that will be sent back to the client (browser) 

    //// here we are using a jwt token
    const token = setUser(user);
    res.cookie("uuid",token)

    return res.redirect("/userData");
}

module.exports = { fetchAllData, signup, login }
