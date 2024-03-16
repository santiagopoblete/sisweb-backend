import { RequestHandler, Request, Response } from "express";
import { Product } from "../models/product/product";

// Create and Save a new Product
export const createProduct: RequestHandler = (req: Request, res: Response) => {
    // Validate request
    if (!req.body.title) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty!",
            payload: null
        });
    }

    // Save Product in the database
    const product = { ...req.body };
    Product.create(product)
        .then((data: Product | null) => {
            res.status(200).json({
                status: "success",
                message: "Product created successfully",
                payload: data
            });
        })
        .catch((err: Error) => {
            res.status(500).json({
                status: "error",
                message: "Something happened creating a product. " + err.message,
                payload: null
            });
        });
};

// Get all products using promises
export const getAllProducts: RequestHandler = (req: Request, res: Response) => {
    // Calling the Sequelize findAll method to get all products. This is the same as SELECT * FROM PRODUCT in a SQL Query.
    Product.findAll()
        .then((data: Product[] | null) => {
            return res.status(200).json({
                status: "success",
                message: "Products retrieved successfully",
                payload: data
            });
        })
        .catch((err: Error) => {
            return res.status(500).json({
                status: "error",
                message: "Something happened retrieving products. " + err.message,
                payload: null
            });
        }); 
};

// Get products by Id
export const getProductById: RequestHandler = (req: Request, res: Response) => {
    Product.findByPk(req.params.id)
        .then((data: Product | null) => {
            return res.status(200).json({
                status: "success",
                message: "Products successfully retrieved",
                payload: data,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                status: "error",
                message: "Something happened retrieving all products. " + err.message,
                payload: null,
            });
        });
};

export const modifyProduct: RequestHandler = (req: Request, res: Response) => {
    // Validate request
    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty.",
            payload: null,
        });
    }
    // Save Product in the database
    Product.update({ ...req.body }, { where: { id: req.params.id } })
        .then((isUpdated) => {
            if (isUpdated) {
                return res.status(200).json({
                    status: "success",
                    message: "Product successfully updated",
                    payload: { ...req.body },
                });
            } else {
                return res.status(500).json({
                    status: "error",
                    message: "Something happened updating the product. ",
                    payload: null,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                status: "error",
                message: "Something happened updating a product. " + err.message,
                payload: null,
            });
        });
};

export const deleteProduct: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
        await Product.destroy({ where: { id } });
        return res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        return res.status(500).json({
            message: "Error deleting products",
            error,
        });
    }
};
