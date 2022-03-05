const httpStatus = require("http-status")
const {TransactionService} = require('../services')

const getDeposits = async (req, res) => {
    const {status, start, end} = req.query

    if(!status || !start || !end ){
        return res.status(httpStatus.BAD_REQUEST).json({
            message: 'All parameters are required'
        })
    }

    const transactions = await TransactionService.getDeposits(status, start, end)
    
    return res.status(httpStatus.OK).json(transactions)
}


module.exports = {
    getDeposits
}