const isAuthenticated = (req, res, next) => {
    if(req.session.user === undefined) {
        return res.status(401).json("you dont have access to this resource");
    
    }
    next();
}

module.exports = {
    isAuthenticated
}