const httpStatus = require("http-status")
const { CustomerService } = require('../services')


const topAllocationAmount = async (req, res) => {
    const { page: pageStr, pageSize: pageSizeStr } = req.query

    const page = Number(pageStr)
    const pageSize = Number(pageSizeStr)

    const customers = await CustomerService.topAllocationAmount(page, pageSize)

    return res.status(httpStatus.OK).json({ customers, page, limit: pageSize })
}


module.exports = {
    topAllocationAmount
}