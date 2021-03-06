const passwordValidator = require('password-validator'); 

// Create a schema
let passwordSchema = new passwordValidator();

// règles à respecter
passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(12)                                   // Maximum length 12
.has().uppercase(1)                              // Must have 1 uppercase letter
.has().lowercase()                              // Must have lowercase letters
.has().digits(1)                                // Must have at least 1 digit
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values


module.exports = (req, res, next) => {
    if(passwordSchema.validate(req.body.uPassword)){
        next();
    }else{
        return res
        .status(400)
        .json({error : "le mot de passe ne respecte pas les règles " + passwordSchema.validate('req.body.password', {list: true })})
    }
}