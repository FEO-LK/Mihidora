export const formatDate = (datetime) => {
    let date = new Date(datetime);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'P.M' : 'A.M';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURADAY'];
const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEOTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER"
];

export const createEventDateFormat = (datetime) => {
    let date = new Date(datetime);
    let day = days[date.getDay()];
    let month = months[date.getMonth()];
    let dayOfTheMonth = date.getDate();
    let year = date.getFullYear();
    let time = formatDate(datetime);
    return `${day}, ${month} ${dayOfTheMonth}, ${year} AT ${time}`;
}

export const updatedTimeFormat = (datetime) => {
    let date = new Date(datetime);
    let dayOfTheMonth = date.getDate();
    let month = months[date.getMonth()]?.toLowerCase();
    let year = date.getFullYear();
    return `${dayOfTheMonth} ${month} ${year}`
}

export const postedDateFormat = (datetime) => {
    let date = new Date(datetime);
    let dayOfTheMonth = date.getDate();
    let month = months[date.getMonth()]?.toLowerCase();
    let year = date.getFullYear();

    return `${dayOfTheMonth}th ${month} ${year}`;
}
