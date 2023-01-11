const userModel = require("../model/user")
const {generateToken} = require('../utils')

const registerUser = async (req, res) => {
    try {
      const { email, password, name, isAdmin } = req.body;
      if (!email || !password || !name) {
        return res.status(400).json({
          success: false,
          message: "Email, Password and Name are required",
        });
      }
      // check if user already exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists with this email",
        });
      }
  
      // create new user
      const newUser = await userModel.create({ email, password, name, isAdmin });

      const { password: _, ...userData } = newUser.toObject()

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: userData,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

const login = async function (req, res) {
    try {
        const { email, password } = req.body;

        // Verify that the email and password are valid
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }

        // finding the user
        let userData = await userModel.findOne({ email, password })
        if (!userData) return res.status(404).send({ status: false, message: "Invalid email or password" })

        // Token Generation
        const token = await generateToken(email);
        
        res.status(200).send({ status: true, message: "User logged in successfully", data: {  token: token } })
    } catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}



module.exports = { registerUser, login }