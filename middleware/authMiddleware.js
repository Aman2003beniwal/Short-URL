
/*
// by using the json

const { getUser } = require("../services/auth");
const restrictToLoggedUserOnly = (req, res, next) => {

    const token = req.cookies.setToken;
    if (!token) {
        return res.status(401).json({
            status: false,
            message: "User must be login, Please login"
        })
    }

    const user = getUser(token);
    if (!user) {
        return res.status(404).json({
            status: false,
            message: "User is not found try again with correct information"
        })
    }

    req.user = user;
    next();
}

const checkAuth = (req, res, next) => {

    const token = req.cookies.setToken;
    const user = getUser(token)

    req.user = user;
    next();

}
module.exports = { restrictToLoggedUserOnly, checkAuth }
*/



/*
////using the statefull authentation

const { getUser } = require("../services/auth");    

const restrictToLoggedUserOnly = (req, res, next) => {
    const uuid = req.cookies.uuid;
    if (!uuid) return res.redirect("/login");

    const user = getUser(uuid);
    if (!user) return res.redirect("/login");
    req.user = user;
    next();
}
const checkAuth = (req, res, next) => {
    const uuid = req.cookies.uuid;
    const user = getUser(uuid);
    req.user = user;
    next();
}

module.exports = { restrictToLoggedUserOnly, checkAuth }
*/


// using stateless authentation 
const { getUser } = require("../services/auth");

const restrictToLoggedUserOnly = (req, res, next) => {
    const token = req.cookies.setToken; // ✅ read JWT, not uuid       
    if (!token) return res.redirect("/login");

    const user = getUser(token);
    if (!user) return res.redirect("/login");

    req.user = user;
    next();
};

const checkAuth = (req, res, next) => {
    const token = req.cookies.setToken; // ✅ read JWT
    const user = getUser(token);
    req.user = user;
    next();
};


module.exports = { restrictToLoggedUserOnly, checkAuth };