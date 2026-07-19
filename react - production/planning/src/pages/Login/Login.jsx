import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    TextField,
    Paper,
    Typography,
} from "@mui/material";

import authService from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const handleLogin = async () => {
    try {
        console.log("Login button clicked");

        const data = await authService.login(username, password);

        console.log("Response:", data);

        login(data);

        console.log("Token after login:", localStorage.getItem("token"));
        console.log("Role:", localStorage.getItem("role"));
        console.log("Username:", localStorage.getItem("username"));

        

// Give React a chance to update the context
setTimeout(() => {
    navigate("/dashboard", { replace: true });
}, 0);

        navigate("/dashboard");

    } catch (error) {
        console.log("Login Error:", error);

        if (error.response) {
            console.log("Status:", error.response.status);
            console.log("Data:", error.response.data);
        } else {
            console.log(error.message);
        }
    }
};

    return (

        <Paper
            elevation={4}
            style={{
                width: 350,
                margin: "100px auto",
                padding: 30,
            }}
        >

            <Typography variant="h5" align="center">

                Production Planning System

            </Typography>

            <br />

            <TextField
                label="Username"
                fullWidth
                onChange={(e) => setUsername(e.target.value)}
            />

            <br /><br />

            <TextField
                type="password"
                label="Password"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <Button
                variant="contained"
                fullWidth
                onClick={handleLogin}
            >
                Login
            </Button>

        </Paper>
    );
}

export default Login;