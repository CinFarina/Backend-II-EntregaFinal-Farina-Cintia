// src/middlewares/auth.middleware.js

const authorization = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).send({ status: 'error', message: 'Unauthorized: No user logged in.' });
        }

        if (req.user.role !== role) {
            return res.status(403).send({ status: 'error', message: `Forbidden: User role is not '${role}'.` });
        }

        next();
    }
};

module.exports = { authorization };
