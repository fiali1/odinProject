const sumAll = function(...array) {
    let indexStart, indexEnd, type0, type1;
    let sum = 0;

    type0 = typeof(array[0]);
    type1 = typeof(array[1]);

    if(
        type0 == "number" && 
        type1 == "number" && 
        array[0] >= 0 && 
        array[1] >= 0) 
    {
        console.log("OK");
        if(array[0] < array[1]) {
            indexStart = array[0];
            indexEnd = array[1];
        }
        else {
            indexStart = array[1];
            indexEnd = array[0];
        }
    }
    else
        return "ERROR";

    for(let i = indexStart; i <= indexEnd; i++) {
        sum += i;
    }

    return sum;
}
module.exports = sumAll
