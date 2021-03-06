import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Button, TextField } from '@material-ui/core';
import clsx from 'clsx';
import { getInvoice, removeItem } from '../services/Invoice.service';

import NewInvoice from './forms/NewInvoice';
import NewInvoiceTable from './forms/NewInvoiceTable';

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

function createData(to, invoice_date, order_date, items) {

    return {
        to,
        invoice_date,
        order_date,
        items: items,
    };
}

function formatDate(myDate) {
    const date = new Date(myDate)
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    return { dd, mm, yyyy }
}

function Row(props) {
    const { row, setItemRemoveDi, setWillDeleteItem } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    const invDate = formatDate(row.date)
    const ordrDate = formatDate(row.order_date)

    const ReadyToDelete = (data) => {
        data.invoice_id = row._id
        setItemRemoveDi(true);
        setWillDeleteItem(data)
    }

    console.log(row);


    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {`${invDate.dd}/${invDate.mm}/${invDate.yyyy}`}
                </TableCell>
                <TableCell align="right">Order Date: {`${ordrDate.dd}/${ordrDate.mm}/${ordrDate.yyyy}`}</TableCell>
                <TableCell align="right">Invoice To: {row.to}</TableCell>
                {/* <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
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
                                    {row.items.map((historyRow) => (
                                        <TableRow key={historyRow._id} onClick={e => ReadyToDelete(historyRow)}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.name}
                                            </TableCell>
                                            <TableCell>{historyRow.rate}</TableCell>
                                            <TableCell align="right">{historyRow.quantity}</TableCell>
                                            {/* <TableCell align="right">
                                                {Math.round(historyRow.amount * row.price * 100) / 100}
                                            </TableCell> */}
                                        </TableRow>
                                    ))}
                                    <TableRow >
                                        <TableCell component="th" scope="row">
                                            <input type="text" />
                                        </TableCell>
                                        <TableCell>qwe</TableCell>
                                        <TableCell align="right">123</TableCell>
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
        </React.Fragment>
    );
}

// Row.propTypes = {
//     row: PropTypes.shape({
//         calories: PropTypes.number.isRequired,
//         carbs: PropTypes.number.isRequired,
//         fat: PropTypes.number.isRequired,
//         history: PropTypes.arrayOf(
//             PropTypes.shape({
//                 amount: PropTypes.number.isRequired,
//                 customerId: PropTypes.string.isRequired,
//                 date: PropTypes.string.isRequired,
//             }),
//         ).isRequired,
//         name: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired,
//         protein: PropTypes.number.isRequired,
//     }).isRequired,
// };

const rows = [
    createData('xyx', '23/23/2323', '24/24/2424', [{ id: 1, name: 'item1', rate: '20', quantity: 2 }]),
    { to: 'xyx', invoice_date: '23/23/2323', order_date: '23/24/2222', items: [{ id: 1, name: 'item2', rate: '30', quantity: 3 }] }
    // createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    // createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    // createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    // createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

// const rows = [
//     { }
// ]

/** 
 * {
 *  id: '123123',
 *  created_by: '12123123213',
 *  to: 'xyx',
 *  order_date: '23/23/2323',
 * items:[
 *      {
 *          "name":"item1",
 *          "rate": "20",
 *          "quantity": "2",
 *           "Id": '123123123' 
 *      } 
 * ],
 * date: '12/12/1221'
 * }
*/

function Home() {
    const classes = useRowStyles();
    const [itemRemoveDi, setItemRemoveDi] = React.useState(false);
    const [newInvOpen, setNewInvOpen] = React.useState(false);
    const [myRows, setmyRows] = React.useState()
    const [willDeleteItem, setWillDeleteItem] = React.useState()

    const deleteItem = () => {
        removeItem(willDeleteItem.invoice_id, willDeleteItem._id)
        setItemRemoveDi(false)
    }


    const handleClickItemRmoveOpen = () => {
        setItemRemoveDi(true)
    };

    const handleCloseItemRmove = () => {
        setItemRemoveDi(false)
    };

    useEffect(() => {
        let fetchData = async () => {
            let data = await getInvoice()
            console.log(data.data)
            setmyRows(data.data)
        };
        fetchData()
    }, [itemRemoveDi])

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableBody>
                        {myRows && myRows.map((row) => (
                            <Row
                                key={row._id}
                                row={row}
                                setItemRemoveDi={setItemRemoveDi}
                                setWillDeleteItem={setWillDeleteItem}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {newInvOpen && <NewInvoiceTable />}
            {!newInvOpen &&
                <Button raised variant="contained" style={{ marginTop: '2rem', float: 'right' }} color="primary" onClick={() => setNewInvOpen(true)} >
                    New Invoice
                </Button>
            }
            {newInvOpen &&
                <Button raised variant="contained" style={{ marginTop: '2rem', float: 'right' }} color="secondary" onClick={() => setNewInvOpen(false)} >
                    cancel
                </Button>
            }
            <NewInvoice
                handleClickOpen={handleClickItemRmoveOpen}
                handleCloseItemRmove={handleCloseItemRmove}
                deleteItem={deleteItem}
                open={itemRemoveDi}
            />
        </>
    );
}

export default Home
