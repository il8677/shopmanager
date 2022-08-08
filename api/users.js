const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const route = express.Router();

let User = require("./models/user-model.js");
let Auth = require("./auth.js")

route.route("/register").post(async(req, res) => {
    const user = req.body;

    console.log(user);

    const usernameTaken = await User.findOne({username: user.username})

    if(usernameTaken){
        res.status(409).json({message: "Username has already been taken"})
        return;
    }

    user.password = await bcrypt.hash(req.body.password, 10);

    const insertUser = new User({
        username: user.username,
        password: user.password,
        accesses: user.accesses
    })

    insertUser.save(function(err) {
        if(err) {
            res.status(500).json({message: "Internal server error"})
            console.log(err)
        }
        else res.json({message: "success"})
    })
})

route.post("/delete/:id", (req, res) => {
    let id = req.params.id;

    User.findByIdAndDelete(id, function(err, user){
        if(!user) res.status(404).send("data not found");
        else res.json({message:"User deleted"});
    })
})

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
            res.json(Auth.getUserAccesses(id));
            return;
        }
    }

    res.status(401).json({message: "Invalid token"});
})

module.exports = route;
