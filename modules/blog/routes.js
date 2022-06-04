const controller = require('./controller');
const { verifyAccessToken } = require('../auth/middleware/middleware');
module.exports = function(app) {
    app.post('/api/blog', verifyAccessToken, controller.createBlog);
    app.get('/api/blog/:blogId', controller.getBlog);
    app.get('/api/blog/:pageSize/:pageNumber', controller.getBlogByPaging);
    app.put('/api/blog/:blogId/like-blog', verifyAccessToken, controller.likeBlog);
    app.put('/api/blog/:blogId/unlike-blog', verifyAccessToken, controller.unlikeBlog);
    app.post('/api/blog/:blogId/comment', verifyAccessToken, controller.addComment);
};