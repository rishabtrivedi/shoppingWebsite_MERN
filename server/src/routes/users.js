import express from "express"; // it will import the express module
import jwt from "jsonwebtoken"; // it will generate the token
import bcrypt, { hash } from "bcrypt"; // it will hash the password
import {UserModel} from "../models/Users.js"; 



const router = express.Router(); // it will create a new router object

// it will handle the post request for the /register endpoint
router.post("/register", async(req,res)=>{
    const {username, password} = req.body; // it will destructure the username and password from the request body
    const user = await UserModel.findOne({username}); // it will find the user with the given username

    // if the user already exists
    if(user){
        res.json({message: "User alreadyy exists"}); // it will send the response with the message
    }

    const hashedPassword = await bcrypt.hash(password, 10); // it will hash the password
    const newUser = new UserModel({username, password: hashedPassword}); // it will create a new user object
    await newUser.save(); // it will save the user object to the database

    // if the user does not exist
    res.json({message: "User Registered Successfully !"}); // it will send the user object
});

router.post("/login",async(req,res) => {
    const {username, password} = req.body; // it will destructure the username and password from the request body
    const user = await UserModel.findOne({username}); // it will find the user with the given username

    if (!user){
        res.json({message: "User does not exist"}); // it will send the response with the message
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // it will compare the password

    if (!isPasswordValid){ // if the password is not valid
        res.json({message: "Usernane or Invalid Password"}); 
    }
    // token generation
    const token = jwt.sign({id: user._id},"secret"); // it will generate the token
    res.json({token, userID: user._id}); // it will send the token and username
});


export { router as userRouter};
