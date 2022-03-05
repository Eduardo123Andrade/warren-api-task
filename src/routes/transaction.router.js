const { Router } = require('express')
const httpStatus = require('http-status')
const { getCustomer } = require('../middlewares/getCustomer');
const {TransactionController} = require('../controllers')
const TransactionRouter = Router()

TransactionRouter.get('/deposits', getCustomer, TransactionController.getDeposits)

module.exports = {
    TransactionRouter
}