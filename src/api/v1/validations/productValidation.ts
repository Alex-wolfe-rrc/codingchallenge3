
import Joi from "joi";

const categories = [
    "electronics",
    "clothing",
    "food",
    "tools",
    "other",
];

const priceSchema = Joi.number()
    .positive()
    .precision(2);

export const createProductSchema = Joi.object({
    name: Joi.string().min(2).max(80).required(),
    sku: Joi.string()
        .pattern(/^[A-Z]{3}\d{4}$/)
        .required(),
    quantity: Joi.number().integer().min(0).required(),
    price: priceSchema.required(),
    category: Joi.string().valid(...categories).required(),
});

export const updateProductSchema = Joi.object({
    name: Joi.string().min(2).max(80),
    quantity: Joi.number().integer().min(0),
    price: priceSchema,
    category: Joi.string().valid(...categories),
}).min(1);
