
import { Router } from "express";

import * as productController from "../controllers/productController";

import { validateRequest } from "../middleware/validateRequest";

import {
    createProductSchema,
    updateProductSchema,
} from "../validation/productValidation";

const router = Router();

router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProductById);

router.post(
    "/",
    validateRequest(createProductSchema),
    productController.createProduct
);

router.put(
    "/:id",
    validateRequest(updateProductSchema),
    productController.updateProduct
);

router.delete("/:id", productController.deleteProduct);

export default router;
