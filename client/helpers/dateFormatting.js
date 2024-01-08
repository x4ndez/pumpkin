const hours = [
    '12',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',

]

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

export const startEndTimeFormat = (startTimeArg, endTimeArg) => {

    const startTime = new Date(startTimeArg);
    const endTime = new Date(endTimeArg);

    return (
        hours[startTime.getHours()] + ':' +
        (startTime.getMinutes() === 0 ? '00' : startTime.getMinutes()) + ' - ' +
        hours[endTime.getHours()] + ':' +
        (endTime.getMinutes() === 0 ? '00' : endTime.getMinutes()) + ' ' +
        (endTime.getHours() <= 11 ? 'AM' : 'PM')
    )

}

export const getDuration = (startTimeArg, endTimeArg) => {

    const startTime = new Date(startTimeArg);
    const endTime = new Date(endTimeArg);

    return (
        (endTime.getHours() - startTime.getHours()) + '.' +
        ((endTime.getMinutes() - startTime.getMinutes()) / 60 * 10) + ' hrs'
    )

}