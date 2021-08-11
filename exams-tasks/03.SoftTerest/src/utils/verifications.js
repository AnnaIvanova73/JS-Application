import constants from "../constants/constants.js";
import exceptionMethods from "../constants/exceptionMethods.js";

export const ifIsInvalidThrow = (arr) => {
    if (arr.some(e => e.trim() === '')) {
        exceptionMethods.throwNewGeneralError(constants.FIELDS_ALERT);
    }
};
export const isPositiveNumber = (arr) => {
    if (arr.some(num => num < 0)) {
        exceptionMethods.throwNewGeneralError(constants.VALUE_SHOULD_BE_POSITIVE);
    }
};

export const getFormDataLog = (arrData,passLimit=undefined) => {
    if(passLimit !== undefined){
        exceptionMethods.throwIfPassBelowLimit(Number(arrData[1].length),passLimit,constants.PASS_LIMIT)
    }

    if (arrData.length >= 3 && arrData[1] !== arrData[2]) {
        exceptionMethods.throwNewGeneralError(constants.PASSWORD_ALERT);
    }

    return {
        email: arrData[0],
        password: arrData[1],
        username: arrData[0],
    };
};
