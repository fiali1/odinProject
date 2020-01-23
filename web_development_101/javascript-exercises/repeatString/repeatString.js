const repeatString = function(string, times) {
    let result = '';
    if(times >= 0) 
        for(let i = 0; i < times; i++)
            result += string;
    else
        result += 'ERROR';
        
    return result;
}

module.exports = repeatString
