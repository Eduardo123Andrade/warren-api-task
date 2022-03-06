const  {depositPathSchema} = require('./deposit-path.schema')
const  {doDepositSchema} = require('./do-deposit.schema')
const  {transactionBetweenPortfolioPathSchema} = require('./transaction-between-portfolios.schema')
const  {paginationPathSchema} = require('./pagination-path.schema')

module.exports = {
    depositPathSchema,
    doDepositSchema,
    transactionBetweenPortfolioPathSchema,
    paginationPathSchema
}