const brandModel = require("../model/brand")
const adminModel = require("../model/user")
const mongoose = require('mongoose');



const addBrand = async (req, res) => {
    try {
        // Destructure the brand data from the request body
        const { name, description } = req.body;

        // Check if all required fields are present
        if (!name || !description) {
            return res.status(400).send({ error: true, message: "name and description are required" });
        }

        // Create a new brand
        const newBrand = new brandModel({ name, description });
        const savedBrand = await newBrand.save();

        // Return a success message with the created brand
        res.status(201).send({ error: false, message: "Brand created successfully", data: savedBrand });

    } catch (error) {
        // If any error occurs, send a 500 Internal Server Error response
        console.log(error);
        res.status(500).send({ error: true, message: "An error occurred while processing your request" });
    }
}

module.exports = { addBrand }