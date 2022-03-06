const { Router } = require('express')
const { getCustomer, validatePath } = require('../middlewares');
const { AdminController } = require('../controllers')
const { paginationPathSchema } = require('../validations')


const AdminRouter = Router()

AdminRouter.get(
    '/topAllocationAmount',
    getCustomer,
    validatePath(paginationPathSchema),
    AdminController.topAllocationAmount
)

module.exports = {
    AdminRouter
}