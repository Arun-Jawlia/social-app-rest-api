const express = require('express')
const { UserModel } = require('../Models/user.model')
const bcrypt = require('bcrypt')

const AuthRouter = express.Router()


AuthRouter.get('/',(req,res)=>
{
    res.send('Hello Succesfully')
})


AuthRouter.post('/register',async(req,res)=>
{
    const {email, password, username} = req.body
  
    try {
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = new UserModel({
            email,
            password:hashedPassword,
            username,
        })

        // Save user and response
      const User=   await newUser.save()
        res.status(200).json(User)
        
    } catch (error) {
       console.log(error) 
    }


})



// Login
AuthRouter.post('/login',async(req,res)=>
{
    const {email, password} = req.body
    try {
        const user = await UserModel.findOne({email:email})
        !user && res.status(404).json('user not found')


        const validPassword = await bcrypt.compare(password, user.password)
        !validPassword && res.status(404).json('incorrect password')


        res.status(200).json(user)


        
    } catch (error) {
        console.log(error)
        res.status(500).json(err)
    }
})









module.exports={
    AuthRouter
}