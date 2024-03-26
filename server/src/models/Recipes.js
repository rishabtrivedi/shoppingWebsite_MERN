import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    ingredients:[{
        type: String,
        required: true
    }], // array of strings
    instructions: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    cookingTime: {
        type: Number,
        required: true
    },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    } // reference to the user who created the recipe


});

export const RecipeModel = mongoose.model("recipes", RecipeSchema);