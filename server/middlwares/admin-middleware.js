const adminMiddleware = async (req, res, next) => {
    
    try {
        const isAdminRole = req.user.isAdmin;

        if (!isAdminRole) {
            return res.status(403).json({ message: "Access denied. User is not an admin" });
        }

        next(); // Only runs if user is admin
    } catch (error) {
        next(error);
    }
};

module.exports=adminMiddleware