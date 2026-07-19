import "./Sidebar.css";
import { Link } from "react-router-dom";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import InventoryIcon from "@mui/icons-material/Inventory";
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";
function Sidebar() {

    const role = localStorage.getItem("role");

    return (

        <div className="sidebar">

            <h3>MENU</h3>

            <Link to="/dashboard">Dashboard</Link>

            {role === "ADMIN" &&
                <>
                    <Link to="/products">Products</Link>
                    <Link to="/employees">Employees</Link>
                </>
            }
            {
    role === "ADMIN" &&

    <ListItem disablePadding>

        <ListItemButton
            component={Link}
            to="/inventory"
        >


            <ListItemText
                primary="Inventory"
            />

        </ListItemButton>

    </ListItem>
}

            {(role === "MANAGER" || role === "ADMIN")&&(
                <>
                    <Link to="/orders">Orders</Link>
                </>
            )}
            {
    (role === "ADMIN" || role === "MANAGER") &&

    <ListItem disablePadding>

        <ListItemButton
            component={Link}
            to="/tracking"
        >

            

            <ListItemText
                primary="Production Tracking"
            />

        </ListItemButton>

    </ListItem>
}

            {(role === "ADMIN" || role === "MANAGER") && (
    <Link to="/tasks">Task Assignment</Link>
)}

            {(role === "ADMIN" || role === "MANAGER") && (
    <Link to="/plans">Production Planning</Link>
)}

            {role === "EMPLOYEE" &&
                <>
                    <Link to="/tasks">My Tasks</Link>
                </>
            }

        </div>

    );
}

export default Sidebar;