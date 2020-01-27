const palindromes = function(string) {
    let newString = string.toLowerCase();
    for(let i = 0; i < newString.length; i++) {
        let char = newString.charAt(i);
        if(char === ' ' || char === ',' || char === '!' || char === '.') {
           newString = newString.replace(char, '');
            i--;
        }
    }    
    
    for(let i = 0; i < newString.length/ 2; i++) {
        let start = newString.charAt(i);
        let end = newString.charAt(newString.length - i - 1);
        if(start !== end)
            return false
    }
    return true;
}

module.exports = palindromes
