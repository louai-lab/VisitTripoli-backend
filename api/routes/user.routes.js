import express from 'express'
import { getAllUsers ,addUser , getUser ,updateUser, userLogin, userSignup} from '../controllers/user.controllers.js';
import upload from '../middleware/multer.js';
import validate from '../middleware/userValidation.js'
import checkAuth from '../middleware/checkAuth.js'


const userRouter = express.Router();


userRouter.get('/',getAllUsers);
userRouter.get('/:id',getUser)
userRouter.post('/add',upload.single('image'),addUser)
userRouter.patch('/update/:id',upload.single('image'),updateUser)
userRouter.post('/register', validate, userSignup)
userRouter.post('/login', checkAuth, userLogin)

export default userRouter