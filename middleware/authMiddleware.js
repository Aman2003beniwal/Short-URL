// const { getUser } = require("../services/auth");    

// const restrictToLoggedUserOnly = (req, res, next) => {
//     const uuid = req.cookies.uuid;
//     if (!uuid) return res.redirect("/login");

//     const user = getUser(uuid);
//     if (!user) return res.redirect("/login");
//     req.user = user;
//     next();
// }
// const checkAuth = (req, res, next) => {
//     const uuid = req.cookies.uuid;
//     const user = getUser(uuid);
//     req.user = user;
//     next();
// }

// module.exports = { restrictToLoggedUserOnly, checkAuth }


const { getUser } = require("../services/auth");

const restrictToLoggedUserOnly = (req, res, next) => {
    const token = req.cookies.uuid; // ✅ read JWT, not uuid       
    if (!token) return res.redirect("/login");

    const user = getUser(token);
    if (!user) return res.redirect("/login");

    req.user = user;
    next();
};

const checkAuth = (req, res, next) => {
    const token = req.cookies.uuid; // ✅ read JWT
    const user = getUser(token);
    req.user = user;
    next();
};

module.exports = { restrictToLoggedUserOnly, checkAuth };
