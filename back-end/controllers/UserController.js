import User from "../models/UserModel.js";


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

export { userDetails }