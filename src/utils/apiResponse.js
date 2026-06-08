
//IN SUCCESS CASE
const resultCode200 = (message = null, data = null, extraParams = null) => {
    let payload = {
        success: true,
        statusCode: 200,
        message: message ?? 'Success',
        data: data ?? []
    }
    if (extraParams) {
        payload = { ...payload, extraParams };
    }
    return payload;
}

//IN BAD REQUEST | VALIDATION FAILED
const resultCode400 = (message = null, error = null, extraParams = null) => {
    let payload = {
        success: false,
        statusCode: 400,
        message: message ?? 'Bad Request',
        error: error ?? "Bad Request"
    }
    if (extraParams) {
        payload = { ...payload, extraParams };
    }
    return payload;
}

//Missing Token / UnAuthorised Token
const resultCode401 = (message = null, error = null, extraParams = null) => {
    let payload = {
        success: false,
        statusCode: 401,
        message: message ?? '401 Unauthorized',
        error: error ?? "401 Unauthorized"
    }
    if (extraParams) {
        payload = { ...payload, extraParams };
    }
    return payload;
}

//Role Misalignment
const resultCode403 = (message = null, error = null, extraParams = null) => {
    let payload = {
        success: false,
        statusCode: 403,
        message: message ?? '403 Forbidden',
        error: error ?? "403 Forbidden"
    }
    if (extraParams) {
        payload = { ...payload, extraParams };
    }
    return payload;
}

//NOT FOUND
const resultCode404 = (message = null, error = null, extraParams = null) => {
    let payload = {
        success: false,
        statusCode: 404,
        message: message ?? '404 Not Found',
        error: error ?? "404 Not Found"
    }
    if (extraParams) {
        payload = { ...payload, extraParams };
    }
    return payload;
}

//TOO MANY REQUEST
const resultCode429 = (message = null, error = null, extraParams = null) => {
    let payload = {
        success: false,
        statusCode: 500,
        message: message ?? '429 Internal Server Error',
        error: error ?? "429 Internal Server Error"
    }
    if (extraParams) {
        payload = { ...payload, extraParams };
    }
    return payload;
}

//SERVER ERROR
const resultCode500 = (message = null, error = null, extraParams = null) => {
    let payload = {
        success: false,
        statusCode: 500,
        message: message ?? '500 Internal Server Error',
        error: error ?? "500 Internal Server Error"
    }
    if (extraParams) {
        payload = { ...payload, extraParams };
    }
    return payload;
}

module.exports = { resultCode200, resultCode400, resultCode401, resultCode403, resultCode404, resultCode429, resultCode500 }