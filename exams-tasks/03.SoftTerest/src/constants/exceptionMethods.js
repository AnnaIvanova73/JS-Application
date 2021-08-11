const throwNewGeneralError = (msg) => {
    throw new Error(msg);
};

const throwIfPassBelowLimit = (pass, limit, msg) => {
    if (pass < limit) {
        throwNewGeneralError(msg);
    }
};
export default {
     throwNewGeneralError, throwIfPassBelowLimit
};