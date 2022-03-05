const Transaction = require('../models/Transaction');
const { TRANSACTION_TYPE, STATUS } = require('../utils');
const CustomerService = require('./customer.service');
const {BalanceError} = require('../errors/BalanceError')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types


const makeDefaultPropertiesToTransactionCreation = (customerId, amount) => {
    return {
        amount,
        _id: ObjectId(),
        _customer: ObjectId(customerId),
        createdAt: new Date(),
        updatedAt: new Date()

    }
}

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
        ...makeDefaultPropertiesToTransactionCreation(customerId, amount),
        type: TRANSACTION_TYPE.DEPOSIT,
        status: STATUS.ACCEPTED,
    })

    await CustomerService.doDeposit(customerId, amount)

    return transaction
}

const transferBetweenAccounts = async (customer, customerId, amount) => {
    const afterDeposit = customer.balance - amount
    const MIN_VALUE_OF_BALANCE = 0

    if (afterDeposit < MIN_VALUE_OF_BALANCE) {
        await Transaction.create({
            ...makeDefaultPropertiesToTransactionCreation(customer._id, amount),
            type: TRANSACTION_TYPE.ACCOUNT_TRANSFER,
            status: STATUS.REJECTED,
        })
        throw new BalanceError()
    }

    await CustomerService.doDeposit(customer._id, -amount)

    const transaction = await Transaction.create({
        ...makeDefaultPropertiesToTransactionCreation(customer._id, amount),
        type: TRANSACTION_TYPE.ACCOUNT_TRANSFER,
        status: STATUS.ACCEPTED,
    })

    await CustomerService.doDeposit(customerId, amount)

    return transaction
}

module.exports = {
    getDeposits,
    doDeposit,
    transferBetweenAccounts
}