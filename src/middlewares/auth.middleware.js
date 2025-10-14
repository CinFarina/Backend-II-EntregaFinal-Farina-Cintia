const authorization = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).send({ status: 'error', message: 'No autenticado' });
        }

        if (req.user.role !== role) {
            return res.status(403).send({ status: 'error', message: 'No autorizado' });
        }

        next();
    };
};

// ✅ Asegurate de exportarlo así:
module.exports = { authorization };