const validator = require('validator')

function getScore(value){
    const score = validator.isStrongPassword(value, {minlength: 6,
        minLowercase: 1, minUppercase: 1,
        minNumbers: 1, minSymbols: 1,
    })
    return score
}

console.log(getScore('Membrane2!'))