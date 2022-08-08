const jwt = require("jsonwebtoken")

let User = require("./models/user-model.js");

async function userHasAccess(userID, accessCategory){
    return User.findById(userID).then((user, err) =>{
        if(!user) return false;
        console.log("User has access " + user.accesses[accessCategory])
        return user.accesses[accessCategory];
    })
}

function getUserAccesses(userID){
    accesses = {};

    User.findById(userID, function(err, user){
        if(!user) return;

        accesses = user.accesses;
    });

    return accesses;
}

function getIDFromJWT(token){
    id = null;

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) return;

        id = decoded.id;
    })

    return id;

}

class AuthRequirement{
    constructor(accessCategory){
        this.accessCategory = accessCategory;

        this.verifyJWT = this.verifyJWT.bind(this)
    }

    verifyJWT(req, res, next) {
        const token = req.headers["x-access-token"]?.split(' ')[1]

        if(token){
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if(err) return res.status(401).json({message: "Failed to authenticate", isLoggedIn: false})
                req.user = {};
                req.user.id = decoded.id;
                req.user.username = decoded.username;
                userHasAccess(decoded.id, this.accessCategory)
                .then(hasAccess =>{
                    console.log(hasAccess);
                    if(hasAccess) next();
                    else res.status(401).json({message: "No access", isLoggedIn: true});
                })
            })
        }else{
            res.status(401).json({message: "Incorrect Token Given", isLoggedIn: false})
        }
    }
}

module.exports = {userHasAccess, AuthRequirement, getUserAccesses, getIDFromJWT}