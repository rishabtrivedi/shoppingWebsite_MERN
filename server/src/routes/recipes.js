import express from "express";
import mongoose from "mongoose";
import { RecipeModel } from "../models/Recipes.js";


const router = express.Router();

router.get("/", async (req, res) => {
    try{
        const response = await RecipeModel.find({}); // it will find all the recipes
        res.json(response); // it will send the response
    } catch (error){
        res.json({message: error.message});
    }
});

router.post("/", async (req, res) => {
    const recipe = new RecipeModel(req.body); // it will create a new recipe object
    try{
        const response = await recipe.save(); // it will find all the recipes
        res.json(response); // it will send the response
    } catch (error){
        res.json({message: error.message});
    }
});

router.put("/", async (req, res) => { // it will handle the put request for the /recipes endpoint
    const recipe = await RecipeModel.findById(req.body.recipeId); // it will find the recipe by its id
    const user = await UserModel.findById(req.body.userId); // it will find the user by its id
    user.savedRecipes.push(recipe); // it will add the recipe to the user's savedRecipes array
    await user.save(); // it will save the user
    res.json({savedRecipes: user.savedRecipes}); // it will send the response

    try{
        const response = await recipe.save(); // it will find all the recipes
        res.json(response); // it will send the response
    } catch (error){
        res.json({message: error.message});
    }
});

router.get("/savedRecipes/ids", async (req, res) => {
    try{
        const user = await UserModel.findById(req.body.userId); // it will find the user by its id
        res.json({savedRecipes: user?.savedRecipes}); // it will send the response
    } catch(error){
        res.json({message: error.message});
    }

});
router.get("/savedRecipes", async (req, res) => {
    try{
        const user = await UserModel.findById(req.params.userId);
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes },
    });
    res.json(savedRecipes);
    } catch(error){
        res.json({message: error.message});
    }

});

export {router as recipesRouter};
