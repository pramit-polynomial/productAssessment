const orderModel = require("../model/order")
const productModel = require("../model/product")
const userModel = require("../model/user")

const createOrder = async (req, res) => {
    try {
        // Destructure the productId and quantity from the request body
        const { productId, quantity } = req.body;

        // Try to find the product by its id
        let findProduct = await productModel.findById(productId);
        // If the product is not found, return a Bad Request error
        if (!findProduct) {
            return res.status(400).send({ error: true, message: "Invalid product id" });
        }

        // Check if the requested quantity is less than the available quantity
        if (quantity < findProduct.quantity) {
            // Create a new order with the provided data
            let totalPrice = quantity * findProduct.price
            let orderCreate = await orderModel.create({ productId, quantity, userId: req.userObj.id, totalPrice: totalPrice });
            // Update the product quantity
            let updatedQuantity = findProduct.quantity - quantity;
            await productModel.findByIdAndUpdate(productId, { quantity: updatedQuantity });
            // Return a success response with the created order
            res.status(201).send({ error: false, message: "Success", data: orderCreate });
        } else {
            // Return a Bad Request error if the requested quantity is greater than the available quantity
            res.status(400).send({ error: true, message: "Quantity requested is greater than the available quantity" });
        }
    } catch (error) {
        // If any error occurs, send a 500 Internal Server Error response
        console.log(error);
        res.status(500).send({ error: true, message: "An error occurred while processing your request" });
    }
}
const getAllOrder = async (req, res) => {
    try {
        let reqObj = {};
        // if is Admin then return all orders otherwise return particular user order
        if (!req.userObj.isAdmin) {
            reqObj.userId = req.userObj.id;
        }
        // Find all orders in the database
        const orders = await orderModel.find(reqObj);

        // Return the orders as a response
        res.status(200).send({ error: false, message: "order list", data: orders });
    } catch (error) {
        // If any error occurs, send a 500 Internal Server Error response
        console.log(error);
        res.status(500).send({ error: true, message: "An error occurred while processing your request" });
    }
}

const getOrderById = async (req, res) => {
    try {
        // Get the order id from the request parameters
        const orderId = req.query.id;

        // Find the order by its id
        const order = await orderModel.findById(orderId);

        // If the order is not found, return a Not Found error
        if (!order) {
            return res.status(404).send({ error: true, message: "Order not found" });
        }

        // Return the order as a response
        res.status(200).send({ error: false, message: "order details", data: order });

    } catch (error) {
        // If any error occurs, send a 500 Internal Server Error response
        console.log(error);
        res.status(500).send({ error: true, message: "An error occurred while processing your request" });
    }

}
const updateOrdder = async (req, res) => {
    try {
        // Get the order id from the request parameters
        const orderId = req.query.id;

        let reqObj = {};
        // if is Admin then return all orders otherwise return particular user order
        if (!req.userObj.isAdmin) {
            reqObj.userId = req.userObj.id;
        }
        // Find the order by its id and update it
        let findOrder = await orderModel.findById(orderId)
        let findProduct = await productModel.findById(findOrder.productId);
        let totalPrice =req.body.quantity * findProduct.price
        req.body.totalPrice = totalPrice
        req.body.userId=req.userObj.id
        console.log(req.body);
        const order = await orderModel.findByIdAndUpdate(orderId, req.body, { new: true });

        // If the order is not found, return a Not Found error
        if (!order) {
            return res.status(404).send({ error: true, message: "Order not found" });
        }

        // Return the updated order
        res.status(200).send({ error: false, data: order });

    } catch (error) {
        // If any error occurs, send a 500 Internal Server Error response
        console.log(error);
        res.status(500).send({ error: true, message: "An error occurred while processing your request" });
    }
}

const deleteOrder = async (req, res) => {
    try {
        // Get the order id from the request parameters
        const orderId = req.query.id;

        // Find the order by its id and delete it
        const order = await orderModel.findByIdAndDelete(orderId);

        // If the order is not found, return a Not Found error
        if (!order) {
            return res.status(404).send({ error: true, message: "Order not found" });
        }

        // Return a success message
        res.status(200).send({ error: false, message: "Order deleted successfully" });

    } catch (error) {
        // If any error occurs, send a 500 Internal Server Error response
        console.log(error);
        res.status(500).send({ error: true, message: "An error occurred while processing your request" });
    }
}
module.exports = { createOrder, getOrderById, deleteOrder, getAllOrder, updateOrdder }