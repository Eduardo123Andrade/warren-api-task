const Customer = require('../models/Customer');


const getPortfolioById = async (id) => {
    const costumer = await Customer
        .findOne({ 'portfolios.id': id })
        .select({ portfolios: { "$elemMatch": { '_id': id } } })

    const [portfolio] = costumer.portfolios
    return portfolio
}

module.exports = {
    getPortfolioById
}