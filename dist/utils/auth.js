import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
export const generateToken = (res, id) => {
    const token = jwt.sign({ id }, JWT_SECRET, {
        expiresIn: "1hr",
    });
    console.log(token);
    res.cookie("jwt", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 60 * 60 * 1000,
    });
};
export const clearToken = (res) => {
    res.cookie("jwt", "", {
        expires: new Date(0),
    });
};
//# sourceMappingURL=auth.js.map