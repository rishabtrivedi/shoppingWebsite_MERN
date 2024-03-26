import express from 'express';
import cors from 'cors'; 
import mongoose from 'mongoose';
import {userRouter} from './routes/users.js'
import {recipesRouter} from './routes/recipes.js'

const app = express();
app.use(express.json()); // it will parse the incoming request with JSON payloads
app.use(cors()); // it will enable all CORS requests

app.use("/auth", userRouter); // it will use the userRouter for all the requests that start with /auth
app.use("/recipes", recipesRouter); // it will use the recipesRouter for all the requests that start with /recipes

mongoose.connect("mongodb+srv://rishabtrivedi0009:WA3DTgM37HUOXIoH@recipes.tfjgicn.mongodb.net/recipes?retryWrites=true&w=majority&appName=recipes",
{
  useNewUrlParser: true, // it will use the new URL parser
  useUnifiedTopology: true, // it will use the new server discovery and monitoring engine
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
