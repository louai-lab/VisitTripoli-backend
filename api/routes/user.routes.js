import express from 'express'
import { getAllUsers ,addUser , getUser ,updateUser} from '../controllers/user.controllers.js';
import upload from '../middleware/multer.js';


const userRouter = express.Router();


userRouter.get('/',getAllUsers);
userRouter.get('/:id',getUser)
userRouter.post('/add',upload.single('image'),addUser)
userRouter.patch('/update/:id',upload.single('image'),updateUser)

export default userRouter