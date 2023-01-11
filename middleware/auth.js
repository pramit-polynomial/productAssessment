const jwt = require("jsonwebtoken");
const userModel = require("../model/user")
const {userAccessEndPoint} = require("./../utils")
const authenticate = async function (req, res, next) {
  try {
    // Extract JWT from the request headers
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "JWT Token must be present"
      });
    }
    // Split the Bearer keyword from the token
    const tokenParts = token.split(" ");
    const accessToken = tokenParts[1];
    // Verify and decode the JWT
    jwt.verify(accessToken, process.env.jwtSecretKey, async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: err.message
        });
      } else {
        req.decodedToken = decodedToken;
        let userData = await userModel.findOne({email: decodedToken.email})
        if (!userData) return res.status(400).send({ error: true, message: "user is not present" })
        if(userData.isAdmin != true){
          let isAccess;
           isAccess = userAccessEndPoint.filter(ele=> ele.url == req.url && ele.method == req.method)
          if( !isAccess.length)
            return res.status(400).send({ error: true, message: "user have not permission to change this fild" })
        }
        req.userObj = userData;
        next();
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = {
  authenticate
};
