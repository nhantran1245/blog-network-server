const blogModel = require('./blog.model');

exports.createBlog = (req, res) => {
    const payload = req.body;
    const { userId } = req.user;
    payload.createdBy = userId;
    payload.createdDate = new Date();
    payload.updatedDate = new Date();
    const blogPayload = new blogModel(payload);
    blogPayload.save((err, newBlog) => {
        if (err || !newBlog) {
            res.status(400).json({
                message: 'Create new blog fail'
            });
        } else {
            res.status(201).json({
                ...newBlog._doc
            });
        }   
    });
};

exports.getBlog = (req, res) => {
    const { blogId } = req.params;
    blogModel.findById(blogId)
    .populate("createdBy")
    .populate("likes.liked_by")
    .populate("comments.commented_by")
    .exec((err, blog) => {
        if (err || !blog) {
            res.status(404).json({
                message: 'Blog not found'
            });
        } else {
            res.status(200).json({
                ...blog._doc
            })
        }
    });
}

exports.getBlogByPaging = (req, res) => {
    const { pageSize, pageNumber } = req.params;
    blogModel.find({})
    .sort({ createdDate: "desc"})
    .limit(+pageSize)
    .skip(+pageSize * (pageNumber -1))
    .populate("createdBy")
    .then(result => 
      res.status(200).json({
        data: result.map(item => {
            delete item.createdBy?.password;
            return item;
        })
      })
    )
    .catch(err => 
        {
            console.log(err);
            res.status(400).json({ message: 'Fail to get blogs'});
        }
    );
}

exports.likeBlog = (req, res) => {
    const { userId } = req.user;
    console.log(userId);
    const { blogId } = req.params;
    blogModel.findById(blogId)
    .then(blog => {
        let likes = blog.likes;
        if (!likes.some(like => like.liked_by == userId)) {
            likes.push({
                liked_by: userId,
                date: new Date(),
            });
        }
        blogModel.findByIdAndUpdate(blogId, { likes }, { new: true })
        .then(updatedBlog => {
            res.status(201).json(updatedBlog);
        })
        .catch(err => res.status(400).json({ message: 'Fail to like blogs'}));
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({ message: 'Fail to like blogs'});
    });
}

exports.unlikeBlog = (req, res) => {
    const { userId } = req.user;
    const { blogId } = req.params;
    blogModel.findById(blogId)
    .then(blog => {
        let likes = blog.likes;
        const removeIndex = likes.findIndex(like => like.liked_by == userId);
        if (removeIndex !== -1) {
            likes.splice(removeIndex, 1);
        }
        blogModel.findByIdAndUpdate(blogId, { likes }, { new: true })
        .then(updatedBlog => {
            res.status(201).json(updatedBlog);
        })
        .catch(err => res.status(400).json({ message: 'Fail to like blogs'}));
    })
    .catch(err => 
        {
            console.log(err);
            res.status(400).json({ message: 'Fail to like blogs'});
        }
    );
}

exports.addComment = (req, res) => {
    const { userId } = req.user;
    const { blogId } = req.params;
    const { comment } = req.body;
    blogModel.findById(blogId)
    .then(blog => {
        let comments = blog.comments;
        comments.push({
            commented_by: userId,
            date: new Date(),
            text: comment,
        })
        blogModel.findByIdAndUpdate(blogId, { comments })
        .then(updatedBlog => {
            res.status(201).json(updatedBlog);
        })
        .catch(err => res.status(400).json({ message: 'Fail to like blogs'}));
    })
    .catch(err => 
        {
            console.log(err);
            res.status(400).json({ message: 'Fail to like blogs'});
        }
    );
}