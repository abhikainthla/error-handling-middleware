const express = require('express');
const app = express();

app.use(express.json());

app.post('/user-info', (req,res, next)=>{
    const { firstName, lastName, password, email, phone } = req.body;

    
    if (!validateName(firstName) || !validateName(lastName)) {
        res.json({
            "success":"false",
            "message":"something went wrong check in console"
    });
        return next(new Error('First name and last name must start with a capital letter.'));
    }

    if (!validatePassword(password)) {
        res.json({
            "success":"false",
            "message":"something went wrong check in console"
    });
        return next(new Error('Password must contain at least one special character, one uppercase letter, one numeric character, and be at least 8 characters long.'));
    }

    if (!validateEmail(email)) {
        res.json({
            "success":"false",
            "message":"something went wrong check in console"
    });
        return next(new Error('Invalid email address must contain @'));
    }

    if (!validatePhone(phone)) {
        res.json({
            "success":"false",
            "message":"something went wrong check in console"
    });
        return next(new Error('Phone number must be at least 10 digits long.'));
    }

    res.json({
        "success":"true",
        "message":"user updated sucessfully"
});
})

function validateEmail(email){
    return email.includes('@');
}

function validateName(name){
    if (typeof name !== 'string' || name.length === 0) return false;
    return name.charAt(0) === name.charAt(0).toUpperCase() && name.slice(1) === name.slice(1).toLowerCase();}

function validatePhone(phone){
    return phone.length>=10;
}

function validatePassword(password){
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const uppercaseRegex = /[A-Z]/;
    const numericRegex = /[0-9]/;
    return (specialCharRegex.test(password) && uppercaseRegex.test(password) && numericRegex.test(password) && password.length >= 8 );
}


app.listen(8000, ()=>{
    console.log('Server is running on port 8000');
})