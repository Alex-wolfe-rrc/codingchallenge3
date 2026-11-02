/**
 * Represents an item in the system
 */
export interface Product {
    id: string;
    name: string;
    description: string;
    price?: number;
    createdAt: Date;
    updatedAt: Date;
}