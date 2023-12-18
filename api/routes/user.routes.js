import express from 'express'
import { getAllUsers , register , getUser ,updateUser} from '../controllers/user.controllers.js';
import upload from '../middleware/multer.js';
import { verifyToken } from '../middleware/auth.js';


const userRouter = express.Router();


userRouter.get('/',getAllUsers);
userRouter.get('/:id',getUser)
userRouter.post('/register',upload.single('image'),register)
userRouter.patch('/update/:id',upload.single('image'),updateUser)

export default userRouter