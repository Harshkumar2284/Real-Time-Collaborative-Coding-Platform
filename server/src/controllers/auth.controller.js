import User from '../models/userData.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    const { username, email, password } = req.body
    const check = await User.findOne({
        $or: [{ email }, { username }]
    })
    if (check) {
        res.status(400).json({ message: "Username or Email aready exists in database" })
    } else {
        const hash = await bcrypt.hash(password, 10)
        const user = await User.create({
            username,
            email,
            password: hash
        })
        res.status(201).json({ message: "Your account has been succesfully created " })
    }

}


export const login = async(req,res)=>{
    try {
        const {identifier, password} = req.body
        const check  = await User.findOne({
            $or:[{username:identifier}, {email:identifier}]
        })
        if(check){
            const passCheck = await bcrypt.compare(password,check.password)
            if(passCheck){
                const accessToken= jwt.sign(
                    {username:check.username},
                    process.env.ACCESS_SECRET,
                )
                
                res.status(201).json(accessToken)
            }else{
                res.status(400).json({message:"Credentials do not match"})
            }
        }else{
            res.status(400).json({message:"Account does not exist"})
        }
    } catch (error) {
        
    }
}