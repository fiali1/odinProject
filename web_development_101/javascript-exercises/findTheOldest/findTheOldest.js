let findTheOldest = function(people) {
    let oldest = people.sort((a, b) => {
        if(a.yearOfDeath == null) {
            let currentYear = new Date().getFullYear();

            let ageA = currentYear - a.yearOfBirth;
            let ageB = b.yearOfDeath - b.yearOfBirth;

            return ageA < ageB;
        }

        let ageA = a.yearOfDeath - a.yearOfBirth;
        let ageB = b.yearOfDeath - b.yearOfBirth;

        return ageA < ageB;
    })

    return oldest[0];
}

module.exports = findTheOldest
