const userModel = require('../models/userModel');
const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
    try {
        const {
            name,
            dob,
            email,
            number,
            gender,
            school,
            institution,
            profession,
            country,
            state,
        } = req.body;

        //validation
        const isNameValid = !!name.trim();
        const isDobValid = !!dob;
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const isNumberValid = /^\d+$/.test(number);
        const isGenderValid = gender === 'Male' || gender === 'Female';
        const isSchoolValid = !!school.trim();
        const isInstitutionValid = !!institution.trim();
        const isProfessionValid = !!profession.trim();
        const isCountryValid = !!country.trim();
        const isStateValid = !!state.trim();

        if (!(isNameValid && isDobValid && isEmailValid && isNumberValid && isGenderValid && isSchoolValid && isInstitutionValid && isProfessionValid && isCountryValid && isStateValid)) {
            return res.status(400).json({
                message: "Fields are not valid"
            })
        }

        const response = await userModel.addData(req.body);
        if (response===400){
            return res.status(400).json({
                message: "Email Already Exists"
            })
        }

        return res.status(201).json({
            message: 'success',
            token : handleLogin(response)
        });

    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

const handleLogin = (userId) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRESIN
    });
}

exports.login = async (req, res) => {

    try {
        const {
            email
        } = req.body;
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isEmailValid) {
            return res.status(400).json({
                message: "Fields are not valid"
            })
        }
        const response = await userModel.findDataWithEmail(email);
        if (response === 404){
            return res.status(404).json({
                message: "Email not Exists"
            })
        }
        let id = "";
        response.forEach(doc => id = doc.id)
        return res.status(201).json({
            message: 'Login success',
            token : handleLogin(id)
        });


    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }

}

exports.protect = async (req, res, next) => {
    try {
        let token;
        // Get token
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }

        // Token not present
        if (!token) {
            return res.status(400).json({
                message: "User Not Logged in"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findDataWithId(decoded.id);

        if (user === 404) {
            return res.status(401).json({
                message: "User Does Not Exists"
            })
        }
        let userId = user.id;

        // Set user on req
        req.user = userId;
        res.locals.user = userId;

        next();
    }catch (err){
        return res.status(400).json({
            message: err.message
        })
    }
};

exports.editProfile = async (req, res) => {
    try {
        const userId = req.user;
        const {
            name,
            dob,
            number,
            gender,
            school,
            institution,
            profession,
            country,
            state,
        } = req.body;

        //validation
        const isNameValid = !!name.trim();
        const isDobValid = !!dob;
        const isNumberValid = /^\d+$/.test(number);
        const isGenderValid = gender === 'male' || gender === 'female';
        const isSchoolValid = !!school.trim();
        const isInstitutionValid = !!institution.trim();
        const isProfessionValid = !!profession.trim();
        const isCountryValid = !!country.trim();
        const isStateValid = !!state.trim();

        if (!(isNameValid && isDobValid && isNumberValid && isGenderValid && isSchoolValid && isInstitutionValid && isProfessionValid && isCountryValid && isStateValid)) {
            return res.status(400).json({
                message: "Fields are not valid"
            })
        }
        await userModel.update(userId, req.body)

        return res.status(201).json({
            message: 'Updated Successfully'
        });

    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

