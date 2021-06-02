const Transaction = require('../../../models/Transaction');

module.exports = (req, res) => {
    const {categoryId, amount, date, note} = req.body;
    
    if (!categoryId || !amount || !date) {
        res.status(406).json({mgs: 'Please enter all fields'});
    }
    
    Transaction
        .findById(req.params.id)
        .then(transaction => {
            if (transaction.userId !== req.user.id) return res.status(403).json({msg: "You don't have access to this transaction"});
            
            transaction.category = categoryId;
            transaction.amount = amount;
            transaction.date = date;
            transaction.note = note;
            
            transaction
                .save()
                .then(transaction => res.json({
                    msg: "Updated Successfully",
                    transaction
                }))
                .catch(() => res.status(500).json({msg: "Updating Failed"}));
        })
        .catch(() => res.status(400).json({msg: "There's no transaction with this ID"}));
}