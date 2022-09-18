export const getTimeString = (_date) => {
    const date = new Date(_date);
    
    return date.toLocaleTimeString('en-US');
}