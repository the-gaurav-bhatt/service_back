import userModel from "../model/user.js";
import { clearToken, generateToken } from "../utils/auth.js";
export const logoutUser = async (req, res) => {
    console.log("logout ROute Hit");
    res.clearCookie("jwt");
    // req.session.destroy;
    clearToken(res);
    return res.status(200).json({ message: "LogOut Success", success: true });
};
export const registerUser = async (req, res) => {
    console.log("Signup URL hit success");
    const { name, email, password } = req.body;
    console.log(name, email, password);
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Some property is missing" });
        }
        const user = await userModel.findOne({ email: email });
        console.log(user);
        if (user) {
            return res.status(400).json({ message: "User Already Exists" });
        }
        else {
            const newUser = await userModel.create({
                name,
                email,
                password,
            });
            generateToken(res, newUser._id);
            const userProfile = {
                name: newUser.name,
                _id: newUser._id,
                img: newUser.profilePicture,
            };
            console.log(newUser);
            return res.status(201).json({
                message: "User Successfully Created",
                success: true,
                userProfile,
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Something went wrong while Registering User",
        });
    }
};
export const authenticateUser = async (req, res) => {
    console.log("Login Route hit");
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    console.log("String password:" + password);
    //skipping decryption of password for the dummy fake user
    if (user && (await user.comparePassword(password))) {
        // if (user && user.password == password) {
        generateToken(res, user._id);
        const _id = user?._id.toString();
        const userProfile = {
            name: user.name,
            _id,
            img: user.profilePicture,
        };
        console.log(userProfile);
        return res.status(200).json({
            message: "Authentication Success",
            success: true,
            userProfile,
        });
    }
    return res.status(401).json({
        message: "Invalid Email/Password",
    });
};
export const giveProfileInfo = async (req, res) => {
    const user = await userModel.findById({ _id: req.user.id }, "name email role contact profilePicture address  ");
    console.log("the user is " + user);
    console.log("Profile ENDPOINT hit");
    console.log(req.user);
    return res.status(200).json({ success: true, profileInfo: user });
};
export const updateProfileInfo = async (req, res) => {
    const data = req.body.state;
    console.log(data);
    const response = await userModel.findOne({ _id: data._id });
    if (response) {
        response.name = data.name;
        response.email = data.email;
        response.address = data.address;
        response.contact = data.contact;
        // response.password = data.password;
        await response.save();
        return res
            .status(200)
            .json({ message: "Success Profile Update", success: true });
    }
    else {
        return res.status(401).json({
            message: "Something Went Wrong While updating Profile Info",
            success: false,
        });
    }
};
export const googleRedirect = (req, res) => {
    const user = req.session.passport.user;
    console.log(user);
    generateToken(res, user.id);
    /*
        user.img
        user.name
  
  
      */
    res.redirect(`${process.env.FRONTEND_URL}/login?name=${user.name}&img=${user.img}&_id=${user.id}`);
};
//# sourceMappingURL=users.controller.js.map