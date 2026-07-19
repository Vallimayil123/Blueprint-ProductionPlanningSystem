import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import dashboardService from "../../services/dashboardService";
import weatherService from "../../services/weatherService";


import {
    Grid,
    Paper,
    Typography
} from "@mui/material";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

function Dashboard() {

    const [weather, setWeather] = useState(null);

    const [counts, setCounts] = useState({
        products: 0,
        orders: 0,
        employees: 0,
        plans: 0,
        tasks: 0,
        inventory: 0
    });

    useEffect(() => {
    loadDashboard();
    loadWeather();
    
}, []);

const loadWeather = async () => {
    try {
        const data = await weatherService.getWeather();
        setWeather(data);
    } catch (e) {
        console.log(e);
    }
};



    const loadDashboard = async () => {

        try {

            const data = await dashboardService.getCounts();

            setCounts(data);

        } catch (e) {

            console.log(e);

        }

    };

    const pieData = {
        labels: [
            "Products",
            "Orders",
            "Employees",
            "Plans",
            "Tasks",
            "Inventory"
        ],
        datasets: [
            {
                data: [
                    counts.products,
                    counts.orders,
                    counts.employees,
                    counts.plans,
                    counts.tasks,
                    counts.inventory
                ]
            }
        ]
    };

    const barData = {
        labels: [
            "Products",
            "Orders",
            "Employees",
            "Plans",
            "Tasks",
            "Inventory"
        ],
        datasets: [
            {
                label: "Records",
                data: [
                    counts.products,
                    counts.orders,
                    counts.employees,
                    counts.plans,
                    counts.tasks,
                    counts.inventory
                ]
            }
        ]
    };

    return (

        <MainLayout>

            <Typography variant="h4" gutterBottom>

                Dashboard

            </Typography>

            <Grid container spacing={3}>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p:3 }}>
                        <Typography variant="h6">
                            Products
                        </Typography>

                        <Typography variant="h3">
                            {counts.products}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p:3 }}>
                        <Typography variant="h6">
                            Orders
                        </Typography>

                        <Typography variant="h3">
                            {counts.orders}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p:3 }}>
                        <Typography variant="h6">
                            Employees
                        </Typography>

                        <Typography variant="h3">
                            {counts.employees}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p:3 }}>
                        <Typography variant="h6">
                            Production Plans
                        </Typography>

                        <Typography variant="h3">
                            {counts.plans}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p:3 }}>
                        <Typography variant="h6">
                            Tasks
                        </Typography>

                        <Typography variant="h3">
                            {counts.tasks}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p:3 }}>
                        <Typography variant="h6">
                            Inventory
                        </Typography>

                        <Typography variant="h3">
                            {counts.inventory}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p:3 }}>
                        <Typography variant="h6">
                            System Distribution
                        </Typography>

                        <Pie data={pieData} />
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p:3 }}>
                        <Typography variant="h6">
                            Records Overview
                        </Typography>

                        <Bar data={barData} />
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
    <Paper sx={{ p: 3 }}>
        <Typography variant="h6">
            Weather
        </Typography>

        {weather && (
    <>
        <Typography>
            City: Chennai
        </Typography>

        <Typography>
            Temperature: {weather.main.temp} °C
        </Typography>

        <Typography>
            Humidity: {weather.main.humidity}%
        </Typography>

        <Typography>
            Condition: {weather.weather[0].description}
        </Typography>

        <Typography>
            Wind: {weather.wind.speed} m/s
        </Typography>
    </>
)}
    </Paper>
</Grid>

            </Grid>

        </MainLayout>

    );

}

export default Dashboard;