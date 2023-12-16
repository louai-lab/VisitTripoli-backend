import jwt from 'jsonwebtoken'


//middleware to check if a specified token exists or not, it is just for more security
const checkAuth = async (req, res, next) => {
    const token = req.header('x-auth-token')

    //check if we have a token
    if (!token)
        res.status(400).json({ message: 'No Token Found!' })

        try {
            const user = await jwt.verify(token, process.env.MY_SECRET)
            req.user = user.email
            next()
        }
        catch (error) {
            res.status(404).json({ message: 'Invalid Token!' })
        }
}

export default checkAuth