import api from "../api/axios";

const getProducts = async () => {
    const response = await api.get("/api/products");
    return response.data;
};

const addProduct = async (product) => {
    const response = await api.post("/api/products", product);
    return response.data;
};

const updateProduct = async (id, product) => {
    const response = await api.put(`/api/products/${id}`, product);
    return response.data;
};

const deleteProduct = async (id) => {
    await api.delete(`/api/products/${id}`);
};

export default {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
};