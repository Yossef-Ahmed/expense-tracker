// Add comma every three digits to the number
export const addComma = (num) => {
    if (num === null) return;
    let floatResponse = '';
    let numComma = num;

    if (isAmountFloat(num)) {
        const numDecimals = num.toString().split('.');
        floatResponse = '.' + numDecimals[1];
        numComma = numDecimals[0];
    }

    numComma = numComma
        .toString()
        .replace('-', '')
        .split("")
        .reverse()
        .map((digit, index) =>
            index !== 0 && index % 3 === 0 ? `${digit},` : digit
        )
        .reverse()
        .join("");

    return `${numComma}${floatResponse}`;
}

export const isAmountFloat = str => {
    return !Number.isInteger(parseFloat(str)) || str.search(/\./) > -1
}

export const removeNonNumericCharsFromString = str => {
    return str.replace(/[^\d.]/g, '');
}

export const leave2NumbersAfterDot = str => {
    const dotIndex = str.indexOf('.');
    str = str.replace(/\./g, '');
    let amountArr = [str.slice(0, dotIndex), ".", str.slice(dotIndex)]
    
    if (amountArr[2].length > 2) {
        amountArr[2] = amountArr[2].slice(0, 2);
    }
    
    amountArr[0] = parseFloat(amountArr[0]).toString();
    return str = amountArr.join('');
}

// Get the name of the day
export const getDayName = dayNum => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[dayNum];
}

// Get the name of the month
export const getMonthName = num => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[num];
}

// Format date dd/mm/yyyy
export const formatDate = date => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const dd = day < 10 ? `0${day}` : day;
    const mm = month < 10 ? `0${month}` : month;
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
}

// Chunk an array into smaller arrays
export const chunkArrayInGroups = (arr, size) => {
    let arrays = [];
    let i = 0;
    for(; i < arr.length; i += size) {
        arrays.push(arr.slice(i, i + size));
    }
    return arrays;
}

// Get the month begging
export const findMonthBegging = days => {
    let newDays = [];
    let i = 0;
    for (; i < days[0].date.getDay(); i++) {
        newDays.push("");
    }
    return [...newDays, ...days];
}