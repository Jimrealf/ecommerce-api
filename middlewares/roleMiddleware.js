const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        const { role } = req.user; // The role is part of the JWT payload
        if (role !== requiredRole) {
            return res.status(403).json({ error: 'Access denied' });
        }
        next();
    };
};

module.exports = roleMiddleware;
