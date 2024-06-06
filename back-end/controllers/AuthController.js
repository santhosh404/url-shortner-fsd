import bcrypt from 'bcryptjs';
import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import { sendMailToActivateAccount, sendMailToResetPassword } from '../services/service.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const signUp = async (req, res) => {
    let { first_name, last_name, email, password } = req.body;

    try {
        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({
                status: "Error",
                message: "Signup Failed!",
                data: {
                    error: "Missing required fields 'first_name', 'last_name', 'email', 'password'"
                }
            })
        }

        //Find if the user already exists
        const user = await User.findOne({ email: email });
        console.log(user);
        if (user) {
            return res.status(400).json({
                status: "Error",
                message: "Signup Failed!",
                data: {
                    error: `User with email id ${email} already exists. Please try again with different email id!`
                }
            })
        }

        //Encrypting password
        password = await bcrypt.hash(password, 10);
        const newUserObject = new User({ first_name, last_name, email, password })
        const newUser = await newUserObject.save()
        
        //Sending account activation email
        const accountActivationLink = `${process.env.FRONTEND_BASE_URL}/activate-account/${newUser._id}`
        await sendMailToActivateAccount(newUser.email, accountActivationLink);

        return res.status(201).json({
            status: "Success",
            message: `Signed up!. Account activation link sent to ${newUser.email}. Please activate!`,
            data: {
                newUser: newUser
            }
        })


    }
    catch (err) {
        return res.status(500).json({
            status: "Error",
            message: "Signup Failed!",
            data: {
                error: err.message
            }
        })
    }
};

const signIn = async (req, res) => {

    let { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                status: "Error",
                message: "Signin Failed!",
                data: {
                    error: "Missing required fields 'email', 'password'"
                }
            })
        }

        //Find if the user already exists
        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(404).json({
                status: "Error",
                message: "Signin Failed!",
                data: {
                    error: `User with email id ${email} not found!. Please go ahead and signup!`
                }
            })
        }

        if(user.verified === false) {
            return res.status(400).json({
                status: "Error",
                message: "Signin Failed!",
                data: {
                    error: `User with an Account ${email} is not activated. Please activate your account to proceed!`
                }
            })
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

        //Comparing password
        const isPasswordSame = await bcrypt.compare(password, user.password);

        if (isPasswordSame) {
            return res.status(200).json({
                status: "Success",
                message: "Signin Success!",
                data: {
                    user: user,
                    token: token
                }
            })
        }
        else {
            return res.status(400).json({
                status: "Error",
                message: "Signin Failed!",
                data: {
                    error: `Email and Password doesn't match!`
                }
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            status: "Error",
            message: "Signup Failed!",
            data: {
                error: err.message
            }
        })
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                status: "Error",
                message: "Forgot Password Failed!",
                data: {
                    error: "Missing required fields 'email'"
                }
            })
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                status: "Error",
                message: "Forgot Password Failed!",
                data: {
                    error: `User with email id ${email} not found!`
                }
            })
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        const resetPasswordLink = `${process.env.FRONTEND_BASE_URL}/reset-password/${user._id}/${token}`;

        //Sending reset password email
        await sendMailToResetPassword(user.email, resetPasswordLink);
        return res.status(200).json({
            status: "Success",
            message: `Password Reset Link sent to ${user.email}!`,
            data: {
                user: user
            }
        })
    }
    catch (err) {
        return res.status(500).json({
            status: "Error",
            message: "Forgot Password Failed!",
            data: {
                error: err.message
            }
        })
    }
}

const resetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    try {
        const objectId = new mongoose.Types.ObjectId(id)
        const registeredUser = await User.findOne({_id: objectId});
        if(!registeredUser) {
            return res.status(404).json({
                status: "Error",
                message: "Reset Password Failed!",
                data: {
                    error: `User with id ${id} not found!`
                }
            })
        }

        //Verifying the token is valid
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, _) => {
            if(err) {
                return res.status(400).json({
                    status: "Error",
                    message: "Reset Password Failed!",
                    data: {
                        error: err.message
                    }
                })
            }
            const encryptedPassword = await bcrypt.hash(password, 10);
            const updatedUser = await User.findOneAndUpdate({ _id: id }, { $set: { password: encryptedPassword } }, { new: true });

            return res.status(200).json({
                status: "Success",
                message: "Password changed successfully!",
                data: {
                    updatedUser: updatedUser
                }
            })

        })

    }
    catch(err) {
        return res.status(500).json({
            status: "Error",
            message: "Reset Password Failed!",
            data: {
                error: err.message
            }
        })
    }
}

const activateAccount = async (req, res) => {
    const { id } = req.params;
    try {

        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({
                status: "Error",
                message: "Account Activation Failed!",
                data: {
                    error: `User with id ${id} not found!`
                }
            })
        }
        if(user.verified) {
            return res.status(400).json({
                status: "Error",
                message: "Account Activation Failed!",
                data: {
                    error: `User with id ${id} is already activated!`
                }
            })
        }
        user.verified = true;
        const updatedUser = await user.save();
        return res.status(200).json({
            status: "Success",
            message: "Account Activation Success!",
            data: {
                updatedUser: updatedUser
            }
        })
    }   
    catch(err) {
        return res.status(500).json({
            status: "Error",
            message: "Account Activation Failed!",
            data: {
                error: err.message
            }
        })
    }
}

export { signUp, signIn, activateAccount, forgotPassword, resetPassword };