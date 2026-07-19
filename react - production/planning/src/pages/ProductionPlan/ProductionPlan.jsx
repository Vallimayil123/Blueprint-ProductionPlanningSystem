import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import productionPlanService from "../../services/productionPlanService";

import {
    Paper,
    Typography,
    Button,
    TextField,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    Alert,
    IconButton,
    MenuItem
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ProductionPlan() {

    const emptyPlan = {
        planId: null,
        orderId: "",
        productCode: "",
        quantity: "",
        productionDays: "",
        dailyTarget: "",
        status: "Planned"
    };

    const [plans, setPlans] = useState([]);
    const [filteredPlans, setFilteredPlans] = useState([]);

    const [search, setSearch] = useState("");

    const [open, setOpen] = useState(false);

    const [editing, setEditing] = useState(false);

    const [plan, setPlan] = useState(emptyPlan);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    useEffect(() => {
        loadPlans();
    }, []);

    useEffect(() => {

        setFilteredPlans(

            plans.filter(p =>
                String(p.orderId).includes(search) ||
                p.productCode.toLowerCase().includes(search.toLowerCase())
            )

        );

    }, [search, plans]);

    const loadPlans = async () => {

        const data = await productionPlanService.getPlans();

        setPlans(data);

    };

    const showMessage = (message, severity) => {

        setSnackbar({
            open: true,
            message,
            severity
        });

    };

    const handleAdd = () => {

        setEditing(false);

        setPlan(emptyPlan);

        setOpen(true);

    };

    const handleEdit = (p) => {

        setEditing(true);

        setPlan(p);

        setOpen(true);

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete Production Plan?"))
            return;

        await productionPlanService.deletePlan(id);

        showMessage("Plan Deleted", "success");

        loadPlans();

    };

    const handleSave = async () => {

        if (editing) {

            await productionPlanService.updatePlan(plan.planId, plan);

            showMessage("Plan Updated", "success");

        }

        else {

            await productionPlanService.addPlan(plan);

            showMessage("Production Plan Created", "success");

        }

        setOpen(false);

        loadPlans();

    };

    return (

        <MainLayout>

            <Paper sx={{ p:3 }}>

                <Typography variant="h4">

                    Production Planning

                </Typography>

                <br/>

                <div
                    style={{
                        display:"flex",
                        justifyContent:"space-between"
                    }}
                >

                    <TextField
                        label="Search Order"
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                        sx={{width:300}}
                    />

                    <Button
                        variant="contained"
                        onClick={handleAdd}
                    >

                        Generate Plan

                    </Button>

                </div>

                <br/>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>Plan ID</TableCell>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Days</TableCell>
                            <TableCell>Daily Target</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {

                            filteredPlans.map(plan=>(

                                <TableRow key={plan.planId}>

                                    <TableCell>{plan.planId}</TableCell>

                                    <TableCell>{plan.orderId}</TableCell>

                                    <TableCell>{plan.productCode}</TableCell>

                                    <TableCell>{plan.quantity}</TableCell>

                                    <TableCell>{plan.productionDays}</TableCell>

                                    <TableCell>{plan.dailyTarget}</TableCell>

                                    <TableCell>{plan.status}</TableCell>

                                    <TableCell>

                                        <IconButton
                                            onClick={()=>handleEdit(plan)}
                                        >
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton
                                            color="error"
                                            onClick={()=>handleDelete(plan.planId)}
                                        >
                                            <DeleteIcon/>
                                        </IconButton>

                                    </TableCell>

                                </TableRow>

                            ))

                        }

                    </TableBody>

                </Table>

            </Paper>

            <Dialog
                open={open}
                onClose={()=>setOpen(false)}
            >

                <DialogTitle>

                    {editing ? "Edit Plan" : "Generate Plan"}

                </DialogTitle>

                <DialogContent>

                    <TextField
                        margin="dense"
                        fullWidth
                        label="Order ID"
                        value={plan.orderId}
                        onChange={(e)=>setPlan({...plan,orderId:e.target.value})}
                    />

                    <TextField
                        margin="dense"
                        fullWidth
                        label="Product Code"
                        value={plan.productCode}
                        onChange={(e)=>setPlan({...plan,productCode:e.target.value})}
                    />

                    <TextField
                        margin="dense"
                        fullWidth
                        label="Quantity"
                        type="number"
                        value={plan.quantity}
                        onChange={(e)=>setPlan({...plan,quantity:e.target.value})}
                    />

                    <TextField
                        margin="dense"
                        fullWidth
                        label="Production Days"
                        type="number"
                        value={plan.productionDays}
                        onChange={(e)=>setPlan({...plan,productionDays:e.target.value})}
                    />

                    <TextField
                        margin="dense"
                        fullWidth
                        disabled
                        label="Daily Target"
                        value={
                            plan.productionDays > 0
                                ? Math.floor(plan.quantity / plan.productionDays)
                                : 0
                        }
                    />

                    <TextField
                        select
                        margin="dense"
                        fullWidth
                        label="Status"
                        value={plan.status}
                        onChange={(e)=>setPlan({...plan,status:e.target.value})}
                    >

                        <MenuItem value="Planned">Planned</MenuItem>

                        <MenuItem value="In Progress">
                            In Progress
                        </MenuItem>

                        <MenuItem value="Completed">
                            Completed
                        </MenuItem>

                    </TextField>

                </DialogContent>

                <DialogActions>

                    <Button onClick={()=>setOpen(false)}>
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleSave}
                    >
                        Save
                    </Button>

                </DialogActions>

            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={()=>setSnackbar({...snackbar,open:false})}
            >
                <Alert severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>

        </MainLayout>

    );

}

export default ProductionPlan;