import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import employeeService from "../../services/employeeService";

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

function Employees() {

    const emptyEmployee = {
        employeeId: null,
        employeeName: "",
        department: "",
        designation: "",
        email: "",
        phone: ""
    };

    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [search, setSearch] = useState("");

    const [employee, setEmployee] = useState(emptyEmployee);

    const [editing, setEditing] = useState(false);

    const [open, setOpen] = useState(false);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    useEffect(() => {
        loadEmployees();
    }, []);

    useEffect(() => {

        setFilteredEmployees(

            employees.filter(emp =>
                emp.employeeName.toLowerCase().includes(search.toLowerCase()) ||
                emp.department.toLowerCase().includes(search.toLowerCase()) ||
                emp.designation.toLowerCase().includes(search.toLowerCase())
            )

        );

    }, [search, employees]);

    const loadEmployees = async () => {

        try {

            const data = await employeeService.getEmployees();

            setEmployees(data);

        } catch {

            showMessage("Unable to load employees", "error");

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

        setEmployee(emptyEmployee);

        setOpen(true);

    };

    const handleEdit = (emp) => {

        setEditing(true);

        setEmployee(emp);

        setOpen(true);

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this employee?"))
            return;

        try {

            await employeeService.deleteEmployee(id);

            showMessage("Employee Deleted", "success");

            loadEmployees();

        } catch {

            showMessage("Delete Failed", "error");

        }

    };

    const handleSave = async () => {

        if (
            employee.employeeName === "" ||
            employee.department === "" ||
            employee.designation === "" ||
            employee.email === "" ||
            employee.phone === ""
        ) {

            showMessage("Please fill all fields", "warning");

            return;

        }

        try {

            if (editing) {

                await employeeService.updateEmployee(
                    employee.employeeId,
                    employee
                );

                showMessage("Employee Updated", "success");

            } else {

                await employeeService.addEmployee(employee);

                showMessage("Employee Added", "success");

            }

            setOpen(false);

            loadEmployees();

        } catch {

            showMessage("Operation Failed", "error");

        }

    };

    return (

        <MainLayout>

            <Paper sx={{ p: 3 }}>

                <Typography variant="h4">

                    Employee Management

                </Typography>

                <br />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >

                    <TextField
                        label="Search Employee"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{ width: 350 }}
                    />

                    <Button
                        variant="contained"
                        onClick={handleAdd}
                    >

                        Add Employee

                    </Button>

                </div>

                <br />

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Designation</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Actions</TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {

                            filteredEmployees.map(emp => (

                                <TableRow key={emp.employeeId}>

                                    <TableCell>{emp.employeeId}</TableCell>

                                    <TableCell>{emp.employeeName}</TableCell>

                                    <TableCell>{emp.department}</TableCell>

                                    <TableCell>{emp.designation}</TableCell>

                                    <TableCell>{emp.email}</TableCell>

                                    <TableCell>{emp.phone}</TableCell>

                                    <TableCell>

                                        <IconButton
                                            color="primary"
                                            onClick={() => handleEdit(emp)}
                                        >

                                            <EditIcon />

                                        </IconButton>

                                        <IconButton
                                            color="error"
                                            onClick={() => handleDelete(emp.employeeId)}
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

                    {editing ? "Edit Employee" : "Add Employee"}

                </DialogTitle>

                <DialogContent>

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Employee Name"
                        value={employee.employeeName}
                        onChange={(e) =>
                            setEmployee({
                                ...employee,
                                employeeName: e.target.value
                            })
                        }
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Department"
                        value={employee.department}
                        onChange={(e) =>
                            setEmployee({
                                ...employee,
                                department: e.target.value
                            })
                        }
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Designation"
                        value={employee.designation}
                        onChange={(e) =>
                            setEmployee({
                                ...employee,
                                designation: e.target.value
                            })
                        }
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Email"
                        value={employee.email}
                        onChange={(e) =>
                            setEmployee({
                                ...employee,
                                email: e.target.value
                            })
                        }
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Phone"
                        value={employee.phone}
                        onChange={(e) =>
                            setEmployee({
                                ...employee,
                                phone: e.target.value
                            })
                        }
                    />

                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={() => setOpen(false)}
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

export default Employees;