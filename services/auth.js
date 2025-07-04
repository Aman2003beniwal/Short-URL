const sessionIdToUserMap = new Map(); // it is a like a dairy that is store the all the id that is generted by user why it try to login.

function setUser(id, user) {  // set the idin dairy that user try to login 
    sessionIdToUserMap.set(id, user);
}

function getUser(id) { // get the user from the dairy that is login
    return sessionIdToUserMap.get(id);
}


module.exports = { setUser, getUser }