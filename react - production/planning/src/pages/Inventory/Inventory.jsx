import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import inventoryService from "../../services/inventoryService";

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
    IconButton
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Inventory() {

    const emptyInventory = {
        inventoryId: null,
        materialName: "",
        availableStock: "",
        usedStock: ""
    };

    const [inventory, setInventory] = useState([]);
    const [filteredInventory, setFilteredInventory] = useState([]);
    const [search, setSearch] = useState("");

    const [item, setItem] = useState(emptyInventory);

    const [editing, setEditing] = useState(false);

    const [open, setOpen] = useState(false);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    useEffect(() => {
        loadInventory();
    }, []);

    useEffect(() => {

        setFilteredInventory(

            inventory.filter(i =>
                i.materialName.toLowerCase().includes(search.toLowerCase())
            )

        );

    }, [search, inventory]);

    const loadInventory = async () => {

        try {

            const data = await inventoryService.getInventory();

            setInventory(data);

        }

        catch {

            showMessage("Unable to Load Inventory", "error");

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

        setItem(emptyInventory);

        setOpen(true);

    };

    const handleEdit = (inventory) => {

        setEditing(true);

        setItem(inventory);

        setOpen(true);

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete Material?"))
            return;

        await inventoryService.deleteInventory(id);

        showMessage("Deleted Successfully", "success");

        loadInventory();

    };

    const handleSave = async () => {

        if (

            item.materialName === "" ||
            item.availableStock === "" ||
            item.usedStock === ""

        ) {

            showMessage("Fill all fields", "warning");

            return;

        }

        try {

            if (editing) {

                await inventoryService.updateInventory(
                    item.inventoryId,
                    item
                );

                showMessage("Inventory Updated", "success");

            }

            else {

                await inventoryService.addInventory(item);

                showMessage("Inventory Added", "success");

            }

            setOpen(false);

            loadInventory();

        }

        catch {

            showMessage("Operation Failed", "error");

        }

    };

    return (

        <MainLayout>

            <Paper sx={{ p:3 }}>

                <Typography variant="h4">

                    Inventory Management

                </Typography>

                <br/>

                <div
                    style={{
                        display:"flex",
                        justifyContent:"space-between"
                    }}
                >

                    <TextField
                        label="Search Material"
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                        sx={{width:300}}
                    />

                    <Button
                        variant="contained"
                        onClick={handleAdd}
                    >

                        Add Material

                    </Button>

                </div>

                <br/>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>ID</TableCell>
                            <TableCell>Material</TableCell>
                            <TableCell>Available</TableCell>
                            <TableCell>Used</TableCell>
                            <TableCell>Remaining</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {

                            filteredInventory.map(item=>(

                                <TableRow key={item.inventoryId}>

                                    <TableCell>{item.inventoryId}</TableCell>

                                    <TableCell>{item.materialName}</TableCell>

                                    <TableCell>{item.availableStock}</TableCell>

                                    <TableCell>{item.usedStock}</TableCell>

                                    <TableCell>{item.remainingStock}</TableCell>

                                    <TableCell>

                                        {

                                            item.status==="Low Stock"

                                            ?

                                            <span style={{color:"red",fontWeight:"bold"}}>

                                                Low Stock

                                            </span>

                                            :

                                            <span style={{color:"green"}}>

                                                Available

                                            </span>

                                        }

                                    </TableCell>

                                    <TableCell>

                                        <IconButton
                                            color="primary"
                                            onClick={()=>handleEdit(item)}
                                        >

                                            <EditIcon/>

                                        </IconButton>

                                        <IconButton
                                            color="error"
                                            onClick={()=>handleDelete(item.inventoryId)}
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

                    {editing ? "Edit Inventory" : "Add Inventory"}

                </DialogTitle>

                <DialogContent>

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Material Name"
                        value={item.materialName}
                        onChange={(e)=>setItem({...item,materialName:e.target.value})}
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        type="number"
                        label="Available Stock"
                        value={item.availableStock}
                        onChange={(e)=>setItem({...item,availableStock:e.target.value})}
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        type="number"
                        label="Used Stock"
                        value={item.usedStock}
                        onChange={(e)=>setItem({...item,usedStock:e.target.value})}
                    />

                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={()=>setOpen(false)}
                    >

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

export default Inventory;