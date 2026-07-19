import api from "../api/axios";

const getPlans = async () => {
    const response = await api.get("/api/plans");
    return response.data;
};

const addPlan = async (plan) => {
    const response = await api.post("/api/plans", plan);
    return response.data;
};

const updatePlan = async (id, plan) => {
    const response = await api.put(`/api/plans/${id}`, plan);
    return response.data;
};

const deletePlan = async (id) => {
    await api.delete(`/api/plans/${id}`);
};

export default {
    getPlans,
    addPlan,
    updatePlan,
    deletePlan
};