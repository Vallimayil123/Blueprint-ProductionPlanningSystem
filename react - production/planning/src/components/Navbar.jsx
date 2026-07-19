import {
    AppBar,
    Toolbar,
    Typography,
    Button
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

function Navbar() {

    const { logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const username = localStorage.getItem("username");

    const role = localStorage.getItem("role");

    const handleLogout = () => {

        logout();

        navigate("/", { replace: true });

    };

    return (

        <AppBar position="static">

            <Toolbar>

                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1 }}
                >
                    Production Planning System
                </Typography>

                <Typography
                    sx={{ mr: 3 }}
                >
                    {username} ({role})
                </Typography>

                <Button
                    color="inherit"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                >
                    Logout
                </Button>

            </Toolbar>

        </AppBar>

    );

}

export default Navbar;