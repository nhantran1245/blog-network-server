const taskController = require('../controllers/taskController');
const { verifyAccessToken } = require('../../auth/middleware/middleware');
module.exports = function(app) {    
    app.get('/tasks', verifyAccessToken, taskController.get_all)
}