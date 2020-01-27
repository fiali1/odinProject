const fibonacci = function(index) {
    if(isNaN(index) || index < 0) {
        return 'OOPS';
    }

    if(index == 0)
        return 0;

    if(index == 1 ||index == 2)
        return 1;

    return fibonacci(index - 1) + fibonacci(index - 2);
}

module.exports = fibonacci
