import api from "../api/axios";

const getWeather = async () => {

    const response = await api.get("/api/weather/Chennai");

    // response.data is already the JSON object if Spring sets the content type correctly.
    // If it's a string, parse it.
    return typeof response.data === "string"
        ? JSON.parse(response.data)
        : response.data;
};

export default {
    getWeather
};