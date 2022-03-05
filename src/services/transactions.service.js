const Transaction = require('../models/Transaction');
const { TRANSACTION_TYPE, STATUS } = require('../utils');
const CustomerService = require('./customer.service');
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types


const getDeposits = async (status, start, end) => {
    const transactions = Transaction.find({
        status,
        type: TRANSACTION_TYPE.DEPOSIT,
        createAt: {
            $get: new Date(start),
            $lt: new Date(end)
        }
    })
    return transactions
}

const doDeposit = async (customerId, amount) => {
    const transaction = Transaction.create({
        amount,
        _id: ObjectId(),
        _customer: ObjectId(customerId),
        type: TRANSACTION_TYPE.DEPOSIT,
        status: STATUS.ACCEPTED,
        createdAt: new Date(),
        updatedAt: new Date()
    })

    const customer = await CustomerService.doDeposit(customerId, amount)

    return transaction
}

module.exports = {
    getDeposits,
    doDeposit
}