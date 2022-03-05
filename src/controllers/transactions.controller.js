const httpStatus = require("http-status")
const {TransactionService} = require('../services')

const getDeposits = async (req, res) => {
    const {status, start, end} = req.query

    const transactions = await TransactionService.getDeposits(status, start, end)
    
    return res.status(httpStatus.OK).json(transactions)
}


const doDeposit = async (req, res) => {
    const {amount} = req.body
    const customerId = req.header('customer-id')

    const customer = await TransactionService.doDeposit(customerId, amount)

    return res.status(httpStatus.OK).json({customer})
}

module.exports = {
    getDeposits,
    doDeposit
}