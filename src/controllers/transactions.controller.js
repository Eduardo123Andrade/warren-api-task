const httpStatus = require("http-status")
const {TransactionService} = require('../services')

const getDeposits = async (req, res) => {
    const {status, start, end} = req.query

    const transactions = await TransactionService.getDeposits(status, start, end)
    
    return res.status(httpStatus.OK).json(transactions)
}


module.exports = {
    getDeposits
}