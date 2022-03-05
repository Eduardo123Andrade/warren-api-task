const { Router } = require('express')
const { getCustomer, validatePath, validateData } = require('../middlewares');
const { TransactionController } = require('../controllers')
const { depositPathSchema, doDepositSchema } = require('../validations')


const TransactionRouter = Router()

TransactionRouter.get(
    '/deposits',
    getCustomer,
    validatePath(depositPathSchema),
    TransactionController.getDeposits
)

TransactionRouter.post(
    '/deposit',
    getCustomer,
    validateData(doDepositSchema),
    TransactionController.doDeposit
)

module.exports = {
    TransactionRouter
}