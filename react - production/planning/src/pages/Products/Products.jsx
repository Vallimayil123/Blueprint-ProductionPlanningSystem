import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import productService from "../../services/productService";

import {
    Paper,
    Typography,
    TextField,
    Button,
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

function Products() {

    const emptyProduct = {
        productId: null,
        name: "",
        code: "",
        price: "",
        productionTime: ""
    };

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState("");

    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(false);

    const [product, setProduct] = useState(emptyProduct);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    useEffect(() => {
        loadProducts();
    }, []);

    useEffect(() => {

        const filtered = products.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.code.toLowerCase().includes(search.toLowerCase())
        );

        setFilteredProducts(filtered);

    }, [search, products]);

    const loadProducts = async () => {
        try {

            const data = await productService.getProducts();

            setProducts(data);

        } catch {

            showMessage("Unable to load products", "error");

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

        setProduct(emptyProduct);

        setOpen(true);

    };

    const handleEdit = (product) => {

        setEditing(true);

        setProduct(product);

        setOpen(true);

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this product?"))
            return;

        try {

            await productService.deleteProduct(id);

            showMessage("Product deleted", "success");

            loadProducts();

        } catch {

            showMessage("Delete failed", "error");

        }

    };

    const handleSave = async () => {

        if (
            product.name === "" ||
            product.code === "" ||
            product.price === "" ||
            product.productionTime === ""
        ) {

            showMessage("Fill all fields", "warning");

            return;
        }

        try {

            if (editing) {

                await productService.updateProduct(
                    product.productId,
                    product
                );

                showMessage("Product updated", "success");

            } else {

                await productService.addProduct(product);

                showMessage("Product added", "success");

            }

            setOpen(false);

            loadProducts();

        } catch (e) {

            if (e.response?.data?.message) {

                showMessage(e.response.data.message, "error");

            } else {

                showMessage("Operation failed", "error");

            }

        }

    };

    return (

        <MainLayout>

            <Paper
                sx={{
                    p: 3
                }}
            >

                <Typography
                    variant="h4"
                    gutterBottom
                >

                    Product Management

                </Typography>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 20
                    }}
                >

                    <TextField

                        label="Search Product"

                        value={search}

                        onChange={(e) =>
                            setSearch(e.target.value)
                        }

                        sx={{
                            width: 350
                        }}

                    />

                    <Button

                        variant="contained"

                        onClick={handleAdd}

                    >

                        Add Product

                    </Button>

                </div>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>ID</TableCell>

                            <TableCell>Name</TableCell>

                            <TableCell>Code</TableCell>

                            <TableCell>Price</TableCell>

                            <TableCell>Production Time</TableCell>

                            <TableCell>Actions</TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {

                            filteredProducts.map((p) => (

                                <TableRow key={p.productId}>

                                    <TableCell>{p.productId}</TableCell>

                                    <TableCell>{p.name}</TableCell>

                                    <TableCell>{p.code}</TableCell>

                                    <TableCell>{p.price}</TableCell>

                                    <TableCell>{p.productionTime}</TableCell>

                                    <TableCell>

                                        <IconButton
                                            color="primary"
                                            onClick={() => handleEdit(p)}
                                        >

                                            <EditIcon />

                                        </IconButton>

                                        <IconButton
                                            color="error"
                                            onClick={() => handleDelete(p.productId)}
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

                    {editing ? "Edit Product" : "Add Product"}

                </DialogTitle>

                <DialogContent>

                    <TextField
                        label="Name"
                        fullWidth
                        margin="dense"
                        value={product.name}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                name: e.target.value
                            })
                        }
                    />

                    <TextField
                        label="Code"
                        fullWidth
                        margin="dense"
                        value={product.code}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                code: e.target.value
                            })
                        }
                    />

                    <TextField
                        label="Price"
                        fullWidth
                        margin="dense"
                        value={product.price}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                price: e.target.value
                            })
                        }
                    />

                    <TextField
                        label="Production Time"
                        fullWidth
                        margin="dense"
                        value={product.productionTime}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                productionTime: e.target.value
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

                <Alert
                    severity={snackbar.severity}
                >

                    {snackbar.message}

                </Alert>

            </Snackbar>

        </MainLayout>

    );

}

export default Products;