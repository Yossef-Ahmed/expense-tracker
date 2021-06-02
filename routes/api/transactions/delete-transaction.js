const Transaction = require('../../../models/Transaction');

module.exports = (req, res) => {
    Transaction
        .findById(req.params.id)
        .then(transaction => {
            if (transaction.userId !== req.user.id) return req.status(403).json({msg: "You don't have access to this transaction"});
            
            transaction
                .deleteOne()
                .then(() => res.json({msg: 'Deleted Successfully'}))
                .catch(() => res.status(500).json({msg: "Deleting Failed"}));
        })
        .catch(() => res.status(400).json({msg: "There's no transaction with this ID"}));
}