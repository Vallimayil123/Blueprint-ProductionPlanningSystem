import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Products from "./pages/Products/Products";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Orders from "./pages/Orders/Orders";
import ProductionPlan from "./pages/ProductionPlan/ProductionPlan";
import Tasks from "./pages/Tasks/Tasks";
import Employees from "./pages/Employees/Employees";
import ProductionTracking from "./pages/ProductionTracking/ProductionTracking";
import Inventory from "./pages/Inventory/Inventory";


function App() {

    const { isLoggedIn } = useContext(AuthContext);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    isLoggedIn ? (
                        <Navigate to="/dashboard" replace />
                    ) : (
                        <Login />
                    )
                }
            />
            <Route
    path="/inventory"
    element={
        isLoggedIn
            ? <Inventory />
            : <Navigate to="/" replace />
    }
/>
            
            <Route
    path="/tracking"
    element={
        isLoggedIn
            ? <ProductionTracking />
            : <Navigate to="/" replace />
    }
/>
            <Route
    path="/employees"
    element={
        isLoggedIn
            ? <Employees />
            : <Navigate to="/" replace />
    }
/>
            <Route
    path="/tasks"
    element={
        isLoggedIn
            ? <Tasks />
            : <Navigate to="/" replace />
    }
/>
            <Route
    path="/plans"
    element={
        isLoggedIn
            ? <ProductionPlan />
            : <Navigate to="/" replace />
    }
/>

            <Route
                path="/dashboard"
                element={
                    isLoggedIn ? (
                        <Dashboard />
                    ) : (
                        <Navigate to="/" replace />
                    )
                }
            />
            <Route
    path="/orders"
    element={
        isLoggedIn
            ? <Orders />
            : <Navigate to="/" replace />
    }
/>

            <Route
    path="/products"
    element={
        isLoggedIn
            ? <Products />
            : <Navigate to="/" replace />
    }
/>

        </Routes>
    );
}

export default App;