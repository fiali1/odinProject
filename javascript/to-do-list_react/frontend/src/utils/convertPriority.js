function convertPriority(priority) {
    let conversion = '';

    switch (priority) {
        case 0:
            conversion = 'Low';
            break;
        case 1:
            conversion = 'Medium';
            break;
        case 2:
            conversion = 'High';
            break;
        default:
            break;        
    }

    return conversion;
}

export default convertPriority;