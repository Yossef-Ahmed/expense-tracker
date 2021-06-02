const User = require('../../../../models/User');
const Category = require('../../../../models/Category');

module.exports = (req, res) => {
    const {name, type} = req.body;
    
    if (!name || !type) {
        res.status(406).json({mgs: 'Please enter all fields'});
    }
    
    User
        .findById(req.user.id)
        .then(user => {
            const category = new Category({
                name,
                type
            });

            user.categories.push(category);
            user
                .save()
                .then(() => res.json({
                    msg: "Added Successfully",
                    category
                }))
                .catch(err => res.status(500).json({msg: "Adding Failed"}));
        })
        .catch(err => res.status(400).json({msg: "There's no user with this ID"}));
}