import api from "../api/axios";

const getInventory = async () => {
    const response = await api.get("/api/inventory");
    return response.data;
};

const addInventory = async (inventory) => {
    const response = await api.post("/api/inventory", inventory);
    return response.data;
};

const updateInventory = async (id, inventory) => {
    const response = await api.put(`/api/inventory/${id}`, inventory);
    return response.data;
};

const deleteInventory = async (id) => {
    await api.delete(`/api/inventory/${id}`);
};

export default {
    getInventory,
    addInventory,
    updateInventory,
    deleteInventory
};