const isAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        console.log("user details",req.user)
        console.log("isAdmin",req.user.isAdmin)
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
};