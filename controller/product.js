const brand = require("../model/brand");
const productModel = require("../model/product")
const adminModel = require("../model/user")


const addProduct = async (req, res) => {
    try {
        // Destructure the product data from the request body
        const { name, description, quantity, price ,brand} = req.body;

        // Check if all required fields are present
        if (!name || !description || !quantity || !price ||!brand) {
            return res.status(400).send({ error: true, message: "name, description, quantity and price are required" });
        }

        // Create a new product
        const newProduct = new productModel({ name, description, quantity, price,brand });
        const savedProduct = await newProduct.save();

        // Return a success message with the created product
        res.status(201).send({ error: false, message: "Product created successfully", data: savedProduct });

    } catch (error) {
        // If any error occurs, send a 500 Internal Server Error response
        console.log(error);
        res.status(500).send({ error: true, message: "An error occurred while processing your request" });
    }
}

module.exports = { addProduct }
