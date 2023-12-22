import express from 'express'
import { upload } from '../middleware/multer.js';
import { verifyToken } from '../middleware/auth.js'
import { getAllUsers , register , getOneUser , updateUser , deleteUser } from '../controllers/user.controllers.js'

const userRouter = express.Router();


userRouter.get('/',getAllUsers);
userRouter.get('/:id',getOneUser);
userRouter.patch('/update/:id', upload.single('image') ,updateUser);
userRouter.delete('/delete/:id', upload.single('image') ,deleteUser);
userRouter.post('/register', upload.single('image') , register)


export default userRouter