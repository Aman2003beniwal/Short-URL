/*

// (this is a statefull authentcation  used in userController.js- for setting the token in a brower as a cookies , use in authMiddleware to get the cookies, to check user is login or not . if user is not login then it will be redirect on login page. and final used in index.js to check the login middleware to redirect in static route, to doing signup and signin logic).

const sessionIdToUserMap = new Map(); // it is a like a dairy that is store the all the id that is generted by user why it try to login.

function setUser(id, user) {  // set the idin dairy that user try to login
    sessionIdToUserMap.set(id, user);
}

function getUser(id) { // get the user from the dairy that is login
    return sessionIdToUserMap.get(id);
}
module.exports = { setUser, getUser }

*/

/*
// know we are stateless authentication
1) require the webToken(jwt)
first create the token for the user and making a payload

*/


const jwt = require("jsonwebtoken");
require('dotenv').config();

// create a token
function setUser(user) {
    // const payload = {
    //     ...user
    // }
    // return (jwt.sign(payload, process.env.JWT_SECRET));

    return jwt.sign({
        _id: user._id,
        email: user.email
    }, process.env.JWT_SECRET);
}


function getUser(token) {
    if (!token) return null;
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { setUser, getUser }

