import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import taskService from "../../services/taskService";

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
    MenuItem,
    IconButton
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Tasks() {

    const emptyTask = {
        taskId: null,
        planId: "",
        employeeName: "",
        department: "",
        taskDescription: "",
        status: "Assigned"
    };

    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [search, setSearch] = useState("");

    const [task, setTask] = useState(emptyTask);

    const [editing, setEditing] = useState(false);

    const [open, setOpen] = useState(false);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    useEffect(() => {
        loadTasks();
    }, []);

    useEffect(() => {

        setFilteredTasks(

            tasks.filter(t =>
                (t.employeeName || "")
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||

                (t.department || "")
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||

                (t.status || "")
                    .toLowerCase()
                    .includes(search.toLowerCase())
            )

        );

    }, [search, tasks]);

    const loadTasks = async () => {

        const data = await taskService.getTasks();

        setTasks(data);

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

        setTask(emptyTask);

        setOpen(true);

    };

    const handleEdit = (task) => {

        setEditing(true);

        setTask(task);

        setOpen(true);

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete Task?"))
            return;

        await taskService.deleteTask(id);

        showMessage("Task Deleted", "success");

        loadTasks();

    };

    const handleSave = async () => {

        if (editing) {

            await taskService.updateTask(task.taskId, task);

            showMessage("Task Updated", "success");

        } else {

            await taskService.addTask(task);

            showMessage("Task Assigned", "success");

        }

        setOpen(false);

        loadTasks();

    };

    return (

        <MainLayout>

            <Paper sx={{ p:3 }}>

                <Typography variant="h4">

                    Task Assignment

                </Typography>

                <br/>

                <div
                    style={{
                        display:"flex",
                        justifyContent:"space-between"
                    }}
                >

                    <TextField
                        label="Search"
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                        sx={{width:300}}
                    />

                    <Button
                        variant="contained"
                        onClick={handleAdd}
                    >
                        Assign Task
                    </Button>

                </div>

                <br/>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>ID</TableCell>
                            <TableCell>Plan ID</TableCell>
                            <TableCell>Employee</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {

                            filteredTasks.map(task => (

                                <TableRow key={task.taskId}>

                                    <TableCell>{task.taskId}</TableCell>

                                    <TableCell>{task.planId}</TableCell>

                                    <TableCell>{task.employeeName}</TableCell>

                                    <TableCell>{task.department}</TableCell>

                                    <TableCell>{task.taskDescription}</TableCell>

                                    <TableCell>{task.status}</TableCell>

                                    <TableCell>

                                        <IconButton
                                            onClick={()=>handleEdit(task)}
                                        >
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton
                                            color="error"
                                            onClick={()=>handleDelete(task.taskId)}
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

                    {editing ? "Edit Task" : "Assign Task"}

                </DialogTitle>

                <DialogContent>

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Plan ID"
                        value={task.planId}
                        onChange={(e)=>setTask({...task,planId:e.target.value})}
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Employee Name"
                        value={task.employeeName}
                        onChange={(e)=>setTask({...task,employeeName:e.target.value})}
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Department"
                        value={task.department}
                        onChange={(e)=>setTask({...task,department:e.target.value})}
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Task Description"
                        value={task.taskDescription}
                        onChange={(e)=>setTask({...task,taskDescription:e.target.value})}
                    />

                    <TextField
                        select
                        fullWidth
                        margin="dense"
                        label="Status"
                        value={task.status}
                        onChange={(e)=>setTask({...task,status:e.target.value})}
                    >

                        <MenuItem value="Assigned">Assigned</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>

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

export default Tasks;