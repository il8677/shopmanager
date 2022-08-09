const jwt = require("jsonwebtoken")

let User = require("./models/user-model.js");

async function userHasAccess(userID, accessCategory){
    return User.findById(userID).then((user, err) =>{
        if(!user) return false;
        return user[accessCategory];
    });
}

async function getUserAccesses(userID){
    const query = User.findById(userID);
    query.select("-password -username");
    
    return query.exec().then((user, err) => {
        if(!user) return;
        return user;
    });
}

function getIDFromJWT(token){
    id = null;

    decoded = jwt.verify(token, process.env.JWT_SECRET);
    id = decoded.id;

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