const userSchema = require('../models/user');
const userModel = require('../models/user');
const express = require('express');
const RRouter = express.Router();
const LRouter = express.Router()

RRouter.post('/register', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const SuccessRes = await userService.registerUser(email, password);
        return res.json({
            status: true,
            Success: 'User registered successfully',
            data: SuccessRes
        });
    } catch (err) {
        throw err;
    }
})
// login
LRouter.post('/login', async (req, res, next) => {

    try {
        const { email, password } = req.body;
        const SuccessRes = await loginService.loginUser(email, password);
        return res.json({
            status: true,
            Success: 'User logged in successfully',
            data: SuccessRes
        });
    } catch (err) {
        throw err;
    }

})


class userService{
    static async registerUser(email, password){
        try {
            const createUser = new userSchema({email, password});
            return await createUser.save();
        } catch (err) {
            throw err;
        }
    }
}

class loginService{
    static async checkLogin(req, res, next){
        try {
            const { email, password } = req.body;
            const user = await userModel.findOne({ email, password });
            if (!user) {
                res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
            else{
                res.json({ success: true, message: 'Login successful' });
                next();
            }
        }
        catch (error) {
            console.error('Error during login:', error);
        };
    }
}

module.exports = RRouter, LRouter;