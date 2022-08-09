const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const route = express.Router();

let User = require("./models/user-model.js");
let Auth = require("./auth.js")

route.post("/login", (req, res) => {
    const loginData = req.body;

    User.findOne({username: loginData.username})
        .then(user => {
            if(!user){
                return res.status(401).json({message: "Invalid username or password"})
            }

            bcrypt.compare(loginData.password, user.password)
                .then(isCorrect => {
                    if(isCorrect){
                        const payload = {
                            id: user.id,
                            username: user.username
                        }
                        jwt.sign(
                            payload,
                            process.env.JWT_SECRET,
                            {expiresIn: 86400},
                            (err, token) => {
                                console.log(err)
                                if(err) return res.json(err)
                                return res.json({message: "Success", token: "Bearer " + token})
                            }
                        )
                    }else{
                        return res.status(401).json({message: "Invalid username or password"})
                    }
                })
        })
})

route.post("/data", (req, res) => {
    const jwtToken = req.body.token.split(" ")[1];

    if(jwtToken){
        id = Auth.getIDFromJWT(jwtToken);
        if(id){ 
            Auth.getUserAccesses(id).then(accesses => {
                if(!accesses){
                    res.status(401).json({message: "Token has invalid ID"});
                    return;
                }
                res.json(accesses);
            });
        }else{
            res.status(401).json({message: "Token has no ID"});
        }
    }else{
        res.status(401).json({message: "No token"});
    }

})

module.exports = route;
