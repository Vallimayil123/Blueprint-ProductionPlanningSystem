import api from "../api/axios";

const login = async (username, password) => {

    const response = await api.post("/auth/login", {
        username,
        password,
    });

    return response.data;
};

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
};

export default {
    login,
    logout,
};