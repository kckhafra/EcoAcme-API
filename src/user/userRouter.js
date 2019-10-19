const express = require('express');
const UsersRouter = express.Router();
const UserService = require('./user-api-service')
const jsonBodyParser = express.json()
const path = require('path')


UsersRouter
.route('/')
.get( (req,res,next)=>{
    const {search_term} = req.query
    if(!req.query.search_term){
        UserService.getAllUsers(req.app.get('db'))
        .then(users=>{
            res.json(users)
        })
        .catch(next)
    }else{
        UserService.searchUsers(req.app.get('db'),search_term)
        .then(users=>{
            res.json(users)
        })
        .catch(next)
    }
})


.post(jsonBodyParser, (req,res,next)=>{
    const {first_name,last_name,email,profession,profession_years,user_name,images,college,degree,password}=req.body
    const newUser= {first_name,last_name,email,profession,profession_years,user_name,images,college,degree}
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

            for (const field of ['first_name', 'last_name','email','profession','profession_years','user_name', 'password','images','college','degree'])
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
.route('/:id')
.get((req,res,next)=>{
    const {id} = req.params
    UserService.getUserById(req.app.get('db'),id)
.then(users=>{
    res.json(users)
})
.catch(next)
})

.patch(jsonBodyParser,(req,res,next)=>{
    const db = req.app.get('db')
    const {id} = req.params
    const {about_me,holistic_services,holistic_organizations}=req.body
    const newAbout = {about_me,holistic_services,holistic_organizations}
    
    
    UserService.updateUser(db,id,newAbout)
    .then(updateUser=>{
        res.json({updateUser:updateUser[0]})
    })
    .catch(next)
})


module.exports= UsersRouter;

// bcrypt.hash(req.body.password, 12)
// .then((hash)=>{}) 
// newUser.password=hash
// return newUser