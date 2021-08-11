import constants from "../constants/constants.js";

export const ifIsInvalidThrow = (arr) => {
    if (arr.some(e => e.trim() === '')) {
        throw new Error(constants.FIELDS_ALERT);
    }
};
export const isPositiveNumber = (arr) => {
    if (arr.some(num => num < 0)) {
        throw new Error(constants.VALUE_SHOULD_BE_POSITIVE);
    }
};

export const getFormDataLog = (arrData) => {
    ifIsInvalidThrow(arrData);

    if (arrData.length >= 3 && arrData[1] !== arrData[2]) {
        throw new Error(constants.PASSWORD_ALERT);
    }

    return {
        email: arrData[0],
        password: arrData[1],
        username: arrData[0],
    };
};
