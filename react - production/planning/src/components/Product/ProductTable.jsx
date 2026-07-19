import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ProductTable({ products, onEdit, onDelete }) {

    return (

        <Table>

            <TableHead>

                <TableRow>

                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Code</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Production Time</TableCell>
                    <TableCell align="center">Actions</TableCell>

                </TableRow>

            </TableHead>

            <TableBody>

                {products.map(product => (

                    <TableRow key={product.productId}>

                        <TableCell>{product.productId}</TableCell>

                        <TableCell>{product.name}</TableCell>

                        <TableCell>{product.code}</TableCell>

                        <TableCell>{product.price}</TableCell>

                        <TableCell>{product.productionTime}</TableCell>

                        <TableCell align="center">

                            <IconButton
                                color="primary"
                                onClick={() => onEdit(product)}
                            >
                                <EditIcon />
                            </IconButton>

                            <IconButton
                                color="error"
                                onClick={() => onDelete(product)}
                            >
                                <DeleteIcon />
                            </IconButton>

                        </TableCell>

                    </TableRow>

                ))}

            </TableBody>

        </Table>

    );

}

export default ProductTable;