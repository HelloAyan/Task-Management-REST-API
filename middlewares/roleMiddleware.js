import { roles as roleHierarchy } from "../config/roles.js";

export const authorizeRoles = (requiredRole) => {
    return (req, res, next) => {
        const userRole = req.user?.role;

        if (!userRole) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        // Check priority according to role hierarchy
        if (roleHierarchy[userRole] < roleHierarchy[requiredRole]) {
            return res.status(403).json({
                message: `Access denied. You are not allowed to access this route.`
            });
        }

        next();
    };
};
