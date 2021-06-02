const User = require('../../../../models/User');

module.exports = (req, res) => {
    User
        .findById(req.user.id).select('categories')
        .then(user => res.json(user.categories))
        .catch(err => res.status(500).json({msg: "Getting Categories Failed"}));
}