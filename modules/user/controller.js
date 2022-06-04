const user = require('./user.model');

exports.updateUser = (req, res) => {
    const payload = req.body;
    const userId = req.params.userId;
    payload.birthDate = new Date(payload.birthDate);
    user.findByIdAndUpdate(userId, payload, (err, user) => {
        console.log(err, user);
        if (err || !user) {
            res.status(404).json({
                message: 'User not found',
            })
        } else {
            res.status(201).json({
                message: 'Update succesfully',
            })
        }
    })

}