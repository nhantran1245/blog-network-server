const authController = require('./controller');
const { verifyAccessToken } = require('./middleware/middleware');

module.exports = function(app) {
    app.post('/auth/login', authController.login);
    app.get('/auth/current-user', verifyAccessToken, authController.getUser);
    app.post('/auth/register', authController.register);
}