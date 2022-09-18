export const getDateString = (_date) => {
    const date = new Date(_date);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const month = months[date.getMonth()];
    const day = days[date.getDay()]
    return `${date.getDate()} ${month}, ${date.getFullYear()} (${day})`;
}