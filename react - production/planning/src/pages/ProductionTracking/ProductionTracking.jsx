import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import productionTrackingService from "../../services/productionTrackingService";

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

import DeleteIcon from "@mui/icons-material/Delete";

function ProductionTracking() {

    const emptyTracking = {
        trackingId: null,
        planId: "",
        plannedQuantity: "",
        actualQuantity: ""
    };

    const [tracking, setTracking] = useState([]);
    const [filteredTracking, setFilteredTracking] = useState([]);
    const [search, setSearch] = useState("");

    const [track, setTrack] = useState(emptyTracking);

    const [open, setOpen] = useState(false);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    useEffect(() => {
        loadTracking();
    }, []);

    useEffect(() => {

        setFilteredTracking(

            tracking.filter(t =>
                String(t.planId).includes(search)
            )

        );

    }, [tracking, search]);

    const loadTracking = async () => {

        try {

            const data = await productionTrackingService.getTracking();

            setTracking(data);

        } catch {

            showMessage("Unable to load records", "error");

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

        setTrack(emptyTracking);

        setOpen(true);

    };

    const handleSave = async () => {

        if (
            track.planId === "" ||
            track.plannedQuantity === "" ||
            track.actualQuantity === ""
        ) {

            showMessage("Fill all fields", "warning");

            return;

        }

        try {

            await productionTrackingService.addTracking(track);

            showMessage("Production Updated", "success");

            setOpen(false);

            loadTracking();

        }

        catch {

            showMessage("Save Failed", "error");

        }

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete record?"))
            return;

        await productionTrackingService.deleteTracking(id);

        showMessage("Deleted Successfully", "success");

        loadTracking();

    };

    return (

        <MainLayout>

            <Paper sx={{ p:3 }}>

                <Typography variant="h4">

                    Production Tracking

                </Typography>

                <br/>

                <div
                    style={{
                        display:"flex",
                        justifyContent:"space-between"
                    }}
                >

                    <TextField
                        label="Search Plan ID"
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                        sx={{width:300}}
                    />

                    <Button
                        variant="contained"
                        onClick={handleAdd}
                    >

                        Add Tracking

                    </Button>

                </div>

                <br/>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>ID</TableCell>
                            <TableCell>Plan ID</TableCell>
                            <TableCell>Planned</TableCell>
                            <TableCell>Actual</TableCell>
                            <TableCell>Remaining</TableCell>
                            <TableCell>Progress %</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {

                            filteredTracking.map(item=>(

                                <TableRow key={item.trackingId}>

                                    <TableCell>{item.trackingId}</TableCell>

                                    <TableCell>{item.planId}</TableCell>

                                    <TableCell>{item.plannedQuantity}</TableCell>

                                    <TableCell>{item.actualQuantity}</TableCell>

                                    <TableCell>{item.remainingQuantity}</TableCell>

                                    <TableCell>

                                        {item.progress.toFixed(2)} %

                                    </TableCell>

                                    <TableCell>

                                        {item.status}

                                    </TableCell>

                                    <TableCell>

                                        <IconButton
                                            color="error"
                                            onClick={()=>handleDelete(item.trackingId)}
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

                    Add Production Record

                </DialogTitle>

                <DialogContent>

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Plan ID"
                        value={track.planId}
                        onChange={(e)=>setTrack({...track,planId:e.target.value})}
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Planned Quantity"
                        type="number"
                        value={track.plannedQuantity}
                        onChange={(e)=>setTrack({...track,plannedQuantity:e.target.value})}
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Actual Quantity"
                        type="number"
                        value={track.actualQuantity}
                        onChange={(e)=>setTrack({...track,actualQuantity:e.target.value})}
                    />

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

export default ProductionTracking;