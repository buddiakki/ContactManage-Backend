
const {constants} = require("../constants")
const errorHandler = (err, req, res, next) => {
const statuscode = res.statusCode ? res.statusCode : 500;
switch (statuscode) {
    case constants.VALIDATION_ERROR:
        res.json({ title: "Validation Failed",message: err.message, stackatrace: err.stack})
        break;
    case constants.NOT_FOUND:
            res.json({ title: "Not found",message: err.message, stackatrace: err.stack})
            break;
    case constants.UNAUTHORIZED:
            res.json({ title: "Un Authorized",message: err.message, stackatrace: err.stack})
            break;

     case constants.FORBIDDEN:
                res.json({ title: "Forbidden",message: err.message, stackatrace: err.stack})
                break;
    case constants.SERVER_ERROR:
                    res.json({ title: "Server Error",message: err.message, stackatrace: err.stack})
                    break;
    default:
        console.log('No error All Good !')
        break;
}

}

module.exports = errorHandler