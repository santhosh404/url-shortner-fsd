import User from "../models/UserModel.js";
import bcrypt from "bcryptjs"

const userDetails = async (req, res) => {

    const user = await User.findOne({ _id: req.user._id});

    if(!user) {
        return res.status(404).json({
            status: 'error',
            message: 'Error fetching user details!',
            data: {
                error: `User not found!`
            }
        })
    }

    return res.status(200).json({
        status:'success',
        message: 'User details fetched successfully!',
        data: {
            user: user
        }
    })
}


const updateUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user._id});

    if(!user) {
        return res.status(404).json({
            status: 'error',
            message: 'Error fetching user details!',
            data: {
                error: `User not found!`
            }
        })
    }

    if(req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10)
    }

    console.log(req.body)

    const newUpdatedUser = await User.findOneAndUpdate({ _id: req.user._id}, {...req.body}, { new: true });
    return res.status(200).json({
        status:'success',
        message: 'User details updated successfully!',
        data: {
            user: newUpdatedUser
        }
    })
}


const deleteUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user._id});
    if(!user) {
        return res.status(404).json({
            status: 'error',
            message: 'Error fetching user details!',
            data: {
                error: `User not found!`
            }
        })
    }

    await User.findOneAndDelete({ _id: req.user._id});
    return res.status(200).json({
        status:'success',
        message: 'User deleted successfully!',
        data: {
            user: user
        }
    })
}



export { userDetails, updateUser, deleteUser }