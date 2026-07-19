import api from "../api/axios";

const getEmployees = async () => {
    const response = await api.get("/api/employees");
    return response.data;
};

const addEmployee = async (employee) => {
    const response = await api.post("/api/employees", employee);
    return response.data;
};

const updateEmployee = async (id, employee) => {
    const response = await api.put(`/api/employees/${id}`, employee);
    return response.data;
};

const deleteEmployee = async (id) => {
    await api.delete(`/api/employees/${id}`);
};

export default {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee
};