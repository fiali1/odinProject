const moment = require('moment');

const convertDate = (string) => {
    if (string === '')
        return 'None';
    const date = moment(string);
    return date.format('MMMM Do, YYYY');
}

export default convertDate;