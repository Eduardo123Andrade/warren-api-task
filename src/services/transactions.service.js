const Transaction = require('../models/Transaction');
const { date } = require('mongoose')


const getDeposits = async (status, start, end) => {
    const transactions = Transaction.find({
        status,
        type: "deposit",
        createAt: {
            $get: new Date(start),
            $lt: new Date(end)
        }
    })
    return transactions
}

module.exports = {
    getDeposits
}