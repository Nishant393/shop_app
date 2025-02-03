

 const isAdmin = (req, res, next) => {
    if (req.user.isAdmin== true || ! req.user) {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
};

export{isAdmin}