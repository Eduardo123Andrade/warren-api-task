const Customer = require('../models/Customer');
const { NotFoundError } = require('../errors/NotFoundError');
const ERROR_MESSAGE = require('../utils/messages/error-messages')


const doDeposit = async (customerId, amount) => {
    const customer = await Customer.findOne({ '_id': customerId })
    const balance = customer.balance + amount

    if(!customer){
        throw new NotFoundError(ERROR_MESSAGE.CUSTOMER_NOT_FOUND)
    }

    await Customer.updateOne({'_id': customerId}, {balance})
    
    Object.assign(customer, { balance: (customer.balance + amount) })

    return customer
}

module.exports = {
    doDeposit
}