const { check} = require('express-validator');

module.exports=[
    check('email').isEmail(),
    check('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/)

]