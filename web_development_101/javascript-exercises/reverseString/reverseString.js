const reverseString = function(string) {
    let reversed = '';

    for(let i = string.length - 1; i >= 0; i--)
        reversed += string.charAt(i);

    return reversed;
}

module.exports = reverseString
