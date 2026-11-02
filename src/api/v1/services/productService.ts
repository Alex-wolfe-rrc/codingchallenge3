
import {
    DocumentData,
    DocumentSnapshot,
    QueryDocumentSnapshot,
    Timestamp,
} from "firebase-admin/firestore";

import {
    Product,
    CreateProductData,
    UpdateProductData,
} from "../models/productModel";

import {
    createDocument,
    getDocuments,
    getDocumentById,
    getDocumentsByFieldValues,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION = "products";

// Converts Firestore data into a Product.
const toProduct = (
    doc: DocumentSnapshot | QueryDocumentSnapshot
): Product => {
    const data: DocumentData = doc.data()!;

    return {
        id: doc.id,
        name: data.name,
        sku: data.sku,
        quantity: data.quantity,
        price: data.price,
        category: data.category,
        createdAt: (data.createdAt as Timestamp).toDate(),
        updatedAt: (data.updatedAt as Timestamp).toDate(),
    };
};

// GET all products
export const getAllProducts = async (): Promise<Product[]> => {
    const snapshot = await getDocuments(COLLECTION);
    return snapshot.docs.map(toProduct);
};

// GET product by ID
export const getProductById = async (
    id: string
): Promise<Product | null> => {
    const doc = await getDocumentById(COLLECTION, id);

    if (!doc) {
        return null;
    }

    return toProduct(doc);
};

// POST create product
export const createProduct = async (
    data: CreateProductData
): Promise<Product> => {
    // Check if SKU is already in use.
    const existing = await getDocumentsByFieldValues(
        COLLECTION,
        [{ fieldName: "sku", fieldValue: data.sku }]
    );

    if (!existing.empty) {
        throw new Error("SKU already exists");
    }

    const now = new Date();

    const id = await createDocument<Product>(COLLECTION, {
        ...data,
        createdAt: now,
        updatedAt: now,
    });

    const product = await getProductById(id);

    if (!product) {
        throw new Error("Failed to retrieve created product");
    }

    return product;
};

// PUT update product
export const updateProduct = async (
    id: string,
    data: UpdateProductData
): Promise<Product | null> => {
    const existing = await getProductById(id);

    if (!existing) {
        return null;
    }

    await updateDocument<Product>(COLLECTION, id, {
        ...data,
        updatedAt: new Date(),
    });

    return getProductById(id);
};

// DELETE product
export const deleteProduct = async (
    id: string
): Promise<boolean> => {
    const existing = await getProductById(id);

    if (!existing) {
        return false;
    }

    await deleteDocument(COLLECTION, id);
    return true;
};
