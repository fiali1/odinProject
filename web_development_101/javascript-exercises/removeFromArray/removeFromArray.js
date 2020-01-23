const removeFromArray = function(...args) {
    let newArray = args[0];

    for(let i = 1; i < args.length; i++) {
        let index = args[0].indexOf(args[i]);

        if(index != -1)
            newArray.splice(index, 1);
    }

    return newArray;
}

module.exports = removeFromArray;
