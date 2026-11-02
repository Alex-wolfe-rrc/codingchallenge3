
import { Request, Response, NextFunction } from "express";
import * as productService from "../services/productService";

// GET all products
export const getAllProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const products = await productService.getAllProducts();

        res.status(200).json({
            message: "Products retrieved",
            count: products.length,
            data: products,
        });
    } catch (error) {
        next(error);
    }
};

// GET product by ID
export const getProductById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const product = await productService.getProductById(
            req.params.id
        );

        if (!product) {
            res.status(404).json({
                message: "Product not found",
            });
            return;
        }

        res.status(200).json({
            message: "Product retrieved",
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

// POST create product
export const createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const product = await productService.createProduct(
            req.body
        );

        res.status(201).json({
            message: "Product created",
            data: product,
        });
    } catch (error) {
        if (
            error instanceof Error &&
            error.message === "SKU already exists"
        ) {
            res.status(409).json({
                message: error.message,
            });
            return;
        }

        next(error);
    }
};

// PUT update product
export const updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const product = await productService.updateProduct(
            req.params.id,
            req.body
        );

        if (!product) {
            res.status(404).json({
                message: "Product not found",
            });
            return;
        }

        res.status(200).json({
            message: "Product updated",
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

// DELETE product
export const deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const deleted = await productService.deleteProduct(
            req.params.id
        );

        if (!deleted) {
            res.status(404).json({
                message: "Product not found",
            });
            return;
        }

        res.status(200).json({
            message: "Product deleted",
        });
    } catch (error) {
        next(error);
    }
};
