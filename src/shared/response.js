function successResponse(res, result) {
    if (!res) return;
    if (result) {
        return res.status(200).json(result);
    }
    return res.status(200);
};

function errorResponse(res, errorMsg) {
    if (!res) return;
    return res.status(500).json({
        success: false,
        error: errorMsg,
    });
}
function unauthorizedResponse(res, errorMsg) {
    if (!res) return;
    return res.status(401).json({
        success: false,
        error: errorMsg
    })
}
function duplicatedResponse(res, errorMsg) {
    if (!res) return;
    return res.status(409).json({
        success: false,
        error: errorMsg
    })
}
function badRequestResponse(res, errorMsg) {
    if (!res) return;
    return res.status(400).json({ success: false, error: errorMsg });
}
function notFoundResponse(res, errorMsg) {
    if (!res) return;
    return res.status(404).json({ success: false, error: errorMsg });
}


export {
    successResponse,
    errorResponse,
    unauthorizedResponse,
    duplicatedResponse,
    badRequestResponse,
    notFoundResponse
}