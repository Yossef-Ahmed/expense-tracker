const User = require('../../../../models/User');

module.exports = (req, res) => {
    const {name, type} = req.body;
    
    if (!name || !type) {
        res.status(406).json({mgs: 'Please enter all fields'});
    }

    User
        .findById(req.user.id)
        .then(user => {
            const getCategory = user.categories.filter(cat => cat._id == req.params.id);
            if (getCategory.length === 0) return res.status(400).json({msg: "There's no category with this ID"});
            
            const categories = user.categories.filter(cat => cat._id != req.params.id);
            
            const category = {
                _id: req.params.id,
                name,
                type
            };

            categories.push(category);
            user.categories = categories;
            
            user
                .save()
                .then(() => res.json({
                    msg: "Updated Successfully",
                    category
                }))
                .catch(() => res.status(500).json({msg: "Updating Failed"}));
        })
        .catch(() => res.status(401).json({msg: "There's no user with this ID"}));
}