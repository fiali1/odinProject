const sortDate = (a, b) => {
    
    const aDate = a.dueDate;
    const bDate = b.dueDate;

    let aYear, aMonth, aDay;
    let bYear, bMonth, bDay;

    if ((aDate === '' && bDate === '') || (aDate !== '' && bDate === ''))
        return 1;
    else if (aDate === '' && bDate !== '')
        return -1;
    
    aYear = parseInt(aDate.slice(0, 4));
    aMonth = parseInt(aDate.slice(5, 7));
    aDay = parseInt(aDate.slice(8, 10));
    
    bYear = parseInt(bDate.slice(0, 4));
    bMonth = parseInt(bDate.slice(5, 7));
    bDay = parseInt(bDate.slice(8, 10));

    if (aYear < bYear)
        return 1;
    
    else if (aYear > bYear)
        return -1;
    
    else {
        if (aMonth < bMonth)
            return 1;
    
        else if (aMonth > bMonth)
            return -1;
    
        else {
            if (aDay < bDay)
                return 1;
            
            else if (aDay > bDay)
                return -1;
            
            else {
                if (a.title > b.title)
                    return -1;
                else 
                    return 1;
            }
        }
    }
}

export default sortDate;