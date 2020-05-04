const convertDate = (string) => {
    if (string === '')
        return 'None';
    const date = new Date(string + " GMT-0300");
    const dateArray = date.toUTCString().split(' ');

    const day = dateArray[1];
    const month = dateArray[2];
    const year = dateArray[3];

    let ord = '';

    switch (day) {
        case '1':
            ord = 'st';
            break;
        case '2':
            ord = 'nd';
            break;
        case '3':
            ord = 'rd';
            break;
        default:
            ord = 'th';
            break; 
    }

    return `${month + " " + day + ord}, ${year}`;
}

export default convertDate;