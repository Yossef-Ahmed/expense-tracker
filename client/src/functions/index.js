// Add comma every three digits to the number
export const addComma = (num, isFloat=true) => {
    if (num === null) return;
    let numDecimals;
    let numComma = num;
    if (isFloat) {
        numDecimals = num.toString().split('.');
        numComma = numDecimals[0];
    }
    numComma = numComma
        .toString() // transform the number to string
        .replace('-', '') // Remove any minus symbols
        .split("") // transform the string to array with every digit becoming an element in the array
        .reverse() // reverse the array so that we can start process the number from the least digit
        .map((digit, index) =>
            index !== 0 && index % 3 === 0 ? `${digit},` : digit
        ) // map every digit from the array.
        // If the index is a multiple of 3 and it's not the least digit,
        // that is the place we insert the comma behind.
        .reverse() // reverse back the array so that the digits are sorted in correctly display order
        .join("");
    return `${numComma}${isFloat ? '.' + numDecimals[1] : ''}`;
}

// Remove any non numeric characters
export const clearNumber = str => {
    return str.replace(/[^\d.]/g, '');
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