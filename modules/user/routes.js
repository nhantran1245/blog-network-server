const controller = require('./controller');
module.exports = function(app) {
    app.put('/api/users/:userId', controller.updateUser);
}