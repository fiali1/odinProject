const caesar = function(string, shift) {
    if(shift > 25)
        shift = shift % 25 - (shift / 25);
    
    let shiftedString = '';

    for(i = 0; i < string.length; i++) {
        let char = string.charAt(i);
        let charValue = char.charCodeAt();
        
        if(charValue >= 65 && charValue <= 90)
            if((charValue + shift) > 90)
                charValue = charValue + shift - 90 + 65 - 1;
            else if((charValue + shift) < 65)
                charValue = charValue + shift + 90 - 65 + 1;
            else 
                charValue += shift;
        
        else if(charValue >= 97 && charValue <= 122)
            if((charValue + shift) > 122) 
                charValue = charValue + shift - 122 + 97 - 1;
            else if((charValue + shift) < 97)
                charValue = charValue + shift + 122 - 97 + 1;
            else  
                charValue += shift;
        
        shiftedString += String.fromCharCode(charValue);
    }

    return shiftedString;
}

module.exports = caesar
