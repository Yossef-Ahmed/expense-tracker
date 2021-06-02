const Transaction = require('../../../models/Transaction');

module.exports = (req, res) => {
    Transaction
        .findOne({_id: req.params.tid, userId: req.user.id})
        .then(transaction => res.json(transaction))
        .catch(() => res.status(400).json({msg: "Couldn't find the transaction"}));
}