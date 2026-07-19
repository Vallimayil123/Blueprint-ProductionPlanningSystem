import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import orderService from "../../services/orderService";

import {
    Typography,
    Paper,
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
    MenuItem,
    Snackbar,
    Alert,
    IconButton
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Orders() {

    const emptyOrder = {
        id: null,
        customerName: "",
        productCode: "",
        quantity: "",
        deadline: "",
        status: "Pending"
    };

    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);

    const [search, setSearch] = useState("");

    const [open, setOpen] = useState(false);

    const [editing, setEditing] = useState(false);

    const [order, setOrder] = useState(emptyOrder);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    useEffect(() => {
        loadOrders();
    }, []);

    useEffect(() => {

        setFilteredOrders(

            orders.filter(o =>
                o.productCode.toLowerCase().includes(search.toLowerCase()) ||
                o.status.toLowerCase().includes(search.toLowerCase()) ||
                (o.customerName || "").toLowerCase().includes(search.toLowerCase())
            )

        );

    }, [search, orders]);

    const loadOrders = async () => {

        try {

            const data = await orderService.getOrders();

            setOrders(data);

        } catch {

            showMessage("Unable to load orders", "error");

        }

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

        setOrder(emptyOrder);

        setOpen(true);

    };

    const handleEdit = (o) => {

        setEditing(true);

        setOrder(o);

        setOpen(true);

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this order?"))
            return;

        await orderService.deleteOrder(id);

        showMessage("Order Deleted", "success");

        loadOrders();

    };

    const handleSave = async () => {

        if (
            order.customerName === "" ||
            order.productCode === "" ||
            order.quantity === "" ||
            order.deadline === ""
        ) {

            showMessage("Fill all fields", "warning");

            return;

        }

        if (editing) {

            await orderService.updateOrder(order.id, order);

            showMessage("Order Updated", "success");

        }

        else {

            await orderService.addOrder(order);

            showMessage("Order Created", "success");

        }

        setOpen(false);

        loadOrders();

    };

    return (

        <MainLayout>

            <Paper sx={{ p: 3 }}>

                <Typography variant="h4">

                    Customer Orders

                </Typography>

                <br />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >

                    <TextField
                        label="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{ width: 350 }}
                    />

                    <Button
                        variant="contained"
                        onClick={handleAdd}
                    >
                        Create Order
                    </Button>

                </div>

                <br />

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>ID</TableCell>

                            <TableCell>Customer</TableCell>

                            <TableCell>Product</TableCell>

                            <TableCell>Quantity</TableCell>

                            <TableCell>Deadline</TableCell>

                            <TableCell>Status</TableCell>

                            <TableCell>Actions</TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {

                            filteredOrders.map((o) => (

                                <TableRow key={o.id}>

                                    <TableCell>{o.id}</TableCell>

                                    <TableCell>{o.customerName}</TableCell>

                                    <TableCell>{o.productCode}</TableCell>

                                    <TableCell>{o.quantity}</TableCell>

                                    <TableCell>{o.deadline}</TableCell>

                                    <TableCell>{o.status}</TableCell>

                                    <TableCell>

                                        <IconButton
                                            onClick={() => handleEdit(o)}
                                        >
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton
                                            color="error"
                                            onClick={() => handleDelete(o.id)}
                                        >
                                            <DeleteIcon />
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
                onClose={() => setOpen(false)}
            >

                <DialogTitle>

                    {editing ? "Edit Order" : "Create Order"}

                </DialogTitle>

                <DialogContent>

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Customer Name"
                        value={order.customerName}
                        onChange={(e) =>
                            setOrder({
                                ...order,
                                customerName: e.target.value
                            })
                        }
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Product Code"
                        value={order.productCode}
                        onChange={(e) =>
                            setOrder({
                                ...order,
                                productCode: e.target.value
                            })
                        }
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Quantity"
                        type="number"
                        value={order.quantity}
                        onChange={(e) =>
                            setOrder({
                                ...order,
                                quantity: e.target.value
                            })
                        }
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        type="date"
                        value={order.deadline}
                        onChange={(e) =>
                            setOrder({
                                ...order,
                                deadline: e.target.value
                            })
                        }
                    />

                    <TextField
                        select
                        fullWidth
                        margin="dense"
                        label="Status"
                        value={order.status}
                        onChange={(e) =>
                            setOrder({
                                ...order,
                                status: e.target.value
                            })
                        }
                    >

                        <MenuItem value="Pending">Pending</MenuItem>

                        <MenuItem value="In Progress">
                            In Progress
                        </MenuItem>

                        <MenuItem value="Delivered">
                            Delivered
                        </MenuItem>

                    </TextField>

                </DialogContent>

                <DialogActions>

                    <Button onClick={() => setOpen(false)}>
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
                onClose={() =>
                    setSnackbar({
                        ...snackbar,
                        open: false
                    })
                }
            >

                <Alert severity={snackbar.severity}>

                    {snackbar.message}

                </Alert>

            </Snackbar>

        </MainLayout>

    );

}

export default Orders;