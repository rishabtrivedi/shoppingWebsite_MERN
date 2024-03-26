import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    savedRecipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "recipes"
    }] // array of references to the recipes that the user has saved
});

export const UserModel = mongoose.model("users", UserSchema);