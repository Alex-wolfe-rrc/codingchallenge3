/**
 * Represents a product in the system
 */
export interface Product {
    id: string;
    name: string;
    sku: string;
    quantity: number;
    price: number;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateProductData = Pick<
    Product,
    "name" | "sku" | "quantity" | "price" | "category"
>;

export type UpdateProductData = Partial<
    Pick<Product, "name" | "quantity" | "price" | "category">
>;
