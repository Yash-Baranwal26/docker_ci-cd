import jwt from "jsonwebtoken"

const authMiddleware = (req,res,next) => {
    try {
        const authHeader = req.headers["authorization"]
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(400).json({message:"Access denied "})
        }

        const token = authHeader.split(" ")[1]

        const decode = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decode;

        next()
    } catch (error) {
        return res.status(500).json({message:"Unable to create token"})
    }
}

export default authMiddleware