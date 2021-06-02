const User = require('../../../../models/User');
const Transaction = require('../../../../models/Transaction');

module.exports = (req, res) => {
    User
        .findById(req.user.id)
        .then(user => {
            const getCategory = user.categories.filter(cat => cat._id == req.params.id);
            if (getCategory.length === 0) return res.status(400).json({msg: "There's no category with this ID"});
            
            Transaction
                .deleteMany({category: req.params.id})
                .then(() => {
                    const categories = user.categories.filter(cat => cat._id != req.params.id);
                    user.categories = categories;

                    user.save()
                        .then(() => res.json({msg: "Deleted Successfully"}))
                        .catch(() => res.status(500).json({msg: "Deleting Failed"}));
                })
                .catch(err => console.log(err));
        })
        .catch(() => res.status(401).json({msg: "There's no user with this ID"}));
}