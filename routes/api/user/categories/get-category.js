const User = require('../../../../models/User');

module.exports = (req, res) => {
    User
        .findById(req.user.id).select('categories')
        .then(user => {
            const category = user.categories.filter(cat => cat._id == req.params.cid);
            res.json(category[0]);
        });
}