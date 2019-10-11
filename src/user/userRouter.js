const express = require('express');
const UsersRouter = express.Router();
const UserService = require('./user-api-service')
const jsonBodyParser = express.json()
const path = require('path')


UsersRouter
.route('/')
.get( (req,res,next)=>{
    UserService.getAllUsers(req.app.get('db'))
.then(users=>{
    res.json(users)
})
.catch(next)
})
.post(jsonBodyParser, (req,res,next)=>{
    const {first_name,last_name,email,profession,profession_years,user_name,images,college,degree,password,about_me}=req.body
    const newUser= {first_name,last_name,email,profession,profession_years,user_name,images,college,degree,about_me}
    const db = req.app.get('db')
    const passwordError = UserService.validatePassword(password)
    
    if(passwordError) return res.status(400).json({error: passwordError})
    
    UserService.hasUserWithUserName(
        req.app.get('db'),
        user_name
    )
        .then(hasUser=>{
            if (hasUser)
            return res.status(400).json({error: `Username already taken`})
        })    

    
        

    UserService.hashPassword(password)
        .then((hash)=>{
            newUser.password=hash

            for (const field of ['first_name', 'last_name','email','profession','profession_years','user_name', 'password','images','college','degree','about_me'])
                if (!req.body[field])
                    return res.status(400).json({
                    error: `Missing '${field}' in request body`
                    })

                        return UserService.postUser(db,newUser)
                        .then(newUser=>{
                        res
                            .status(201)
                            .location(path.posix.join(req.originalUrl, `/${newUser.id}`))
                            .json(newUser)
                        })
                        .catch(next)
                    })
        })
    



UsersRouter
.get('/:id', (req,res,next)=>{
    const {id} = req.params
    UserService.getUserById(req.app.get('db'),id)
.then(users=>{
    res.json(users)
})
.catch(next)
})

module.exports= UsersRouter;

// bcrypt.hash(req.body.password, 12)
// .then((hash)=>{}) 
// newUser.password=hash
// return newUser