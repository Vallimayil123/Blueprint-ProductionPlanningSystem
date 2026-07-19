import api from "../api/axios";

const getCounts = async () => {

    const response = await api.get("/api/dashboard/counts");

    return response.data;

};

export default {

    getCounts

};