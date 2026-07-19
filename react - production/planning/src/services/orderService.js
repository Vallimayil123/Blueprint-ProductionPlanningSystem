import api from "../api/axios";

const getOrders = async () => {
    const response = await api.get("/api/orders");
    return response.data;
};

const addOrder = async (order) => {
    const response = await api.post("/api/orders", order);
    return response.data;
};

const updateOrder = async (id, order) => {
    const response = await api.put(`/api/orders/${id}`, order);
    return response.data;
};

const deleteOrder = async (id) => {
    await api.delete(`/api/orders/${id}`);
};

export default {
    getOrders,
    addOrder,
    updateOrder,
    deleteOrder
};