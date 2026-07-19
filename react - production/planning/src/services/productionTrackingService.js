import api from "../api/axios";

const getTracking = async () => {
    const response = await api.get("/api/tracking");
    return response.data;
};

const addTracking = async (tracking) => {
    const response = await api.post("/api/tracking", tracking);
    return response.data;
};

const deleteTracking = async (id) => {
    await api.delete(`/api/tracking/${id}`);
};

export default {
    getTracking,
    addTracking,
    deleteTracking
};