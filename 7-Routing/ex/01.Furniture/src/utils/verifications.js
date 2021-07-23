import constants from "../constants/constants.js";

export const ifIsInvalidThrow = (arr) => {
    if (arr.some(e => e.trim() === '')) {
        throw new Error(constants.FIELDS_ALERT);
    }
};
export const getFormDataLog = (arrData) => {
    ifIsInvalidThrow(arrData);


    if (arrData.length === 3 && arrData[1] !== arrData[2]) {
        throw new Error(constants.PASSWORD_ALERT);
    }

    return {
        email: arrData[0],
        password: arrData[1]
    };
};


export const verifyAllDataFormFields = (form) => {
    const newMake = form.get('make');
    const newModel = form.get('model');
    const newYear = form.get('year');
    const newDescription = form.get('description');
    const newPrice = form.get('price');
    const newImage = form.get('img');
    const newMaterial = form.get('material');

    ifIsInvalidThrowFurnitureSpecific([newMake, newModel, newYear, newDescription, newPrice, newImage]);

    if (isBelowNumber(newMake, 4)) {
        throw new Error(constants.INVALID_MAKE);
    }

    if (isBelowNumber(newMake, 4)) {
        throw new Error(constants.INVALID_MODEL);
    }

    if (isYearInvalid(newYear)) {
        throw new Error(constants.INVALID_YEAR);
    }

    if (isBelowNumber(newDescription, 10)) {
        throw new Error(constants.INVALID_DESCRIPTION);
    }

    if (isPriceInvalid(newPrice)) {
        throw new Error(constants.INVALID_PRICE);
    }
    return {
        description: newDescription, img: newImage, make: newMake, material: newMaterial, model: newModel,
        price: newPrice, year: newYear
    };
};

const ifIsInvalidThrowFurnitureSpecific = (arr) => {
    if (arr.some(e => e.trim() === '')) {
        throw new Error(constants.FIELDS_FURNITURE);
    }
};

export const isBelowNumber = (p, number) => {
    return p.length < 4;
};

export const isYearInvalid = (p) => {
    return !(Number(p) < 2050 && Number(p) > 1950)
};

export const isPriceInvalid = (p) => {
    return Number(p) < 0;
};
