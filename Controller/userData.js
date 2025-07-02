/*
// this all are created by using json
const Users = require("../models/userData");
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
module.exports = { signup }
*/


//// using the server side renderin
const User = require("../models/userData");
async function signup(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.send("Name,email,password all fields are required...");
    }

    const data=await User.create({ name, email, password });
    console.log(data)
    res.render("Home")



}

module.exports = { signup }