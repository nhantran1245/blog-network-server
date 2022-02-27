const JWT = require('jsonwebtoken');

exports.verifyAccessToken = function(req, res, next) {
    if (!req.headers['authorization']) {
        res.status(401).json({
            message: 'Unauthorized'
        });
        next();
    } else {
        const authHeader = req.headers['authorization'];
        const token = authHeader.split(' ')[1];
        JWT.verify(token, process.env.SECRET_KEY, (err, payload) => {
            if (err) {
                return res.status(401).json(err);
                next();
            } else {
                req.user = payload;
                next();
            }
        })
    }
}