export const formatDate = (date, format) => {

    const newDate = new Date(date);
    const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    // MMYYYY eg: December 2023
    if (format === 'MMYYYY') {
        return `${month[newDate.getMonth()]} ${newDate.getFullYear()}`;
    }

}