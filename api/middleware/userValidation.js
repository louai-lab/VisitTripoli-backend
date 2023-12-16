import { check } from "express-validator"

//middleware to validate the correct format of email and password
const validate = [
    check('email', 'Please provide a valid Email!').isEmail(),
    check('password', 'Please provide a password with 6-20 characters length!').isLength({ min: 6, max: 20 })
]

export default validate