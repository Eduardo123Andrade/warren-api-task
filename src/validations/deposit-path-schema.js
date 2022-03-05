const Yup = require('yup')
const { VALIDATION_MESSAGE } = require('../utils/messages')


const depositPathSchema = Yup.object().shape({
    status: Yup.string().required(VALIDATION_MESSAGE.STATUS_IS_REQUIRED),
    start: Yup.string().required(VALIDATION_MESSAGE.DATE_START_IS_REQUIRED),
    end: Yup.string().required(VALIDATION_MESSAGE.DATE_END_IS_REQUIRED)
})

module.exports = {
    depositPathSchema
}