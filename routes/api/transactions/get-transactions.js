const Transaction = require('../../../models/Transaction');

module.exports = (req, res) => {
    const {start, end} = req.body;
    
    if (!start) {
        res.status(400).json({mgs: 'Please choose a month'});
    }
    
    const dateQuery = end ? {$gte: start, $lte: end} : {$gte: start}
    
    Transaction
        .find({userId: req.user.id, date: dateQuery})
        .then(transactions => {
            res.json(transactions);
        });
}