const jwt = require('jsonwebtoken')

const generateToken = async(email)=>{
    const token = jwt.sign({ email: email }, process.env.jwtSecretKey, { expiresIn: '1d' });
    return token;
}

const userAccessEndPoint = [
    {
        url:"/order",
        method: "GET"
    }   
]
module.exports = {
    generateToken,
    userAccessEndPoint
}