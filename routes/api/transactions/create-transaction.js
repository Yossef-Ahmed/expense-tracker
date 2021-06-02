const Transaction = require('../../../models/Transaction');

module.exports = (req, res) => {
    const {categoryId, amount, date, note} = req.body;
    
    if (!categoryId || !amount || !date) {
        res.status(406).json({mgs: 'Please enter all fields'});
    }
    
    const newTransaction = new Transaction({
        category: categoryId,
        amount,
        date,
        note,
        userId: req.user.id
    });
    
    newTransaction
        .save()
        .then(transaction => res.json({
            msg: "Added Successfully",
            transaction
        }))
        .catch(() => res.status(500).json({msg: "Adding Failed"}));
}