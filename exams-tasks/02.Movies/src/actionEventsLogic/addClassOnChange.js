const isNotEmpty = (field) => field !== '';

const isValidNumberCount = (currNumber,numLimit) => isNotEmpty(currNumber) && Number(currNumber.length) >= numLimit;

const isBetweenTwoNumbersIncluded = (currNumber,numStart, numEnd,) => isNotEmpty(numStart) &&
    (Number(currNumber) >= Number(numStart) && Number(currNumber) <= Number(numEnd));

const isPositive = (num) => isNotEmpty(num) && Number(num) > -1;

export default {
    isNotEmpty,isValidNumberCount,isBetweenTwoNumbersIncluded,isPositive
}