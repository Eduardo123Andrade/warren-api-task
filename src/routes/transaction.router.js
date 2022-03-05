const { Router } = require('express')
const { getCustomer, validatePath } = require('../middlewares');
const { TransactionController } = require('../controllers')
const { depositPathSchema } = require('../validations')

const TransactionRouter = Router()

TransactionRouter.get('/deposits', getCustomer, validatePath(depositPathSchema), TransactionController.getDeposits)

module.exports = {
    TransactionRouter
}