import { Box, Button, Collapse, IconButton, makeStyles, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import clsx from 'clsx';
import React, { useState } from 'react'

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    newInvoice: {
        width: '100%',

    },
});


function NewInvoiceTable() {
    const classes = useRowStyles();
    const [AccOpen, setAccOpen] = useState(false)
    const date = new Date();

    const [to, setTo] = useState()
    const [orderDate, setOrderDate] = useState();
    const [invoiceDate, setinvoiceDate] = useState(date)
    const [name, setName] = useState()
    const [rate, setRate] = useState()
    const [quantity, setQuantity] = useState()

    var dd = String(invoiceDate.getDate()).padStart(2, '0');
    var mm = String(invoiceDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = invoiceDate.getFullYear();

    return (
        <div>
            <Table aria-label="collapsible table">
                <TableBody>
                    <TableRow className={clsx(classes.root, classes.newInvoice)} >
                        <TableCell>
                            <IconButton aria-label="expand row" size="small" onClick={() => setAccOpen(!AccOpen)}>
                                {AccOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </TableCell>
                        <TableCell component="th" scope="row">
                            Invoice Date: {`${dd}/${mm}/${yyyy}`}
                        </TableCell>
                        <TableCell align="right"> <TextField
                            autoFocus
                            margin="dense"
                            id="order-date"
                            label="Order Date"
                            type="date"
                            placeholder=''
                            fullWidth
                            onChange={e => setOrderDate(e.target.value)}
                        /></TableCell>
                        <TableCell align="right">
                            <TextField
                                autoFocus
                                margin="dense"
                                id="to"
                                label="To"
                                type="text"
                                fullWidth
                                onChange={e => setTo(e.target.value)}
                            />
                        </TableCell>
                        {/* <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell> */}
                        <TableCell>
                            <Button raised variant="contained" style={{ marginTop: '2rem', float: 'right' }} color="primary" >
                                Add
                            </Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={AccOpen} timeout="auto" unmountOnExit>
                                <Box margin={1}>
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Rate</TableCell>
                                                <TableCell align="right">Quantity</TableCell>
                                                {/* <TableCell align="right">Total price ($)</TableCell> */}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/* {row.items.map((historyRow) => ( */}
                                            {/* ))} */}
                                            <TableRow >
                                                <TableCell>
                                                    <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="name"
                                                        label="Name"
                                                        type="text"
                                                        fullWidth
                                                        onChange={e => setName(e.target.value)}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="rate"
                                                        label="Rate"
                                                        type="text"
                                                        fullWidth
                                                        onChange={e => setRate(e.target.value)}
                                                    />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="quantity"
                                                        label="Quantity"
                                                        type="text"
                                                        fullWidth
                                                        onChange={e => setQuantity(e.target.value)}
                                                    />
                                                </TableCell>
                                                {/* <TableCell align="right">
                                                {Math.round(historyRow.amount * row.price * 100) / 100}
                                            </TableCell> */}
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}




export default NewInvoiceTable
