
import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const validateRequest = (schema: ObjectSchema) => {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            convert: false,
        });

        if (error) {
            res.status(400).json({
                message: `Validation error: ${error.details
                    .map((detail) => detail.message)
                    .join(", ")}`,
            });
            return;
        }

        req.body = value;
        next();
    };
};
