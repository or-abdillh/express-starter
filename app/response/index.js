'use strict'

//Generate JSON
const createJSON = (code, message, results) => {
    return {
        status: code === 200 ? true : false,
        code,
        message,
        results,
        createAt: new Date().toLocaleString()
    }
}

//Response handler
const success = (data, res) => res.status(200).send( createJSON(200, 'Success', data) )

const notFound = (data, res) => res.status(404).send( createJSON(404, 'Not Found', data) )

const internalServerError = (err, res) => res.status(501).send( createJSON(501, 'Something problem was happen', err) )

const forbidden = (data, res) => res.status(403).send( createJSON(403, 'Forbidden', data) )
//Export
module.exports = {
    success,
    notFound,
    internalServerError,
    forbidden
}
