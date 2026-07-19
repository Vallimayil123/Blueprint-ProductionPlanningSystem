import api from "../api/axios";

const getTasks = async () => {
    const role = localStorage.getItem("role");

const url =
    role === "EMPLOYEE"
        ? "/api/tasks/my"
        : "/api/tasks";

const response = await api.get(url);

return response.data;
};

const addTask = async (task) => {
    const response = await api.post("/api/tasks", task);
    return response.data;
};

const updateTask = async (id, task) => {
    const response = await api.put(`/api/tasks/${id}`, task);
    return response.data;
};

const deleteTask = async (id) => {
    await api.delete(`/api/tasks/${id}`);
};

export default {
    getTasks,
    addTask,
    updateTask,
    deleteTask
};