const User = require('../../../models/User');

module.exports = (req, res) => {
    User.findById(req.user.id).select('-password')
        .then(user => res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                active: user.active
            },
            categories: user.categories
        }));
};