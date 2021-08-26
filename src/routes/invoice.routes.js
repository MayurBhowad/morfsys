const express = require('express');
const { session } = require('passport');
const router = express.Router();
const passport = require('passport')

const Invoice = require('../models/invoice.model');
const User = require('../models/user.model');

//@route    GET api/invoice/tests
//@dest     Test invoice route
//@access   Public
router.get('/tests', (req, res) => res.json({ msg: "invoice WOrks" }));

//@route    POST api/invoice/new
//@dest     new invoice
//@access   Private
router.post('/new', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { userId, invoiceDate, to, orderDate, items } = req.body;
    if (!req.user.id) {
        return res.status(403).json({ err: 'Unauthorized' })
    }
    const newInvoice = new Invoice({
        created_by: req.user.id,
        date: invoiceDate,
        to,
        items,
        order_date: orderDate
    })
    newInvoice.save().then((doc) => {
        return res.status(200).json(doc)
    }).catch(err => {
        console.log(err);
        return res.status(400).json({ err: 'Somting went wrong!' })
    })
})

//@route    PATCH /invoice/:invoice_id
//@dest     edit invoice
//@access   Private
router.patch('/:invoice_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { invoice_id } = req.params;
    const { items } = req.body;

    Invoice.findById(invoice_id).populate('created_by', ['id', 'name', 'email']).then(invoice => {
        if (invoice.created_by.id.toString() !== req.user.id) {
            return res.status(403).json({ err: 'Unauthorize!' })
        }
        items.map(item => {
            invoice.items.push(item)
        })
        invoice.save().then(doc => res.status(200).json(doc)).catch(err => console.log(err))
    })
})


//@route    DELETE /invoice/:item_id/:invoice_id
//@dest     delete invoice item
//@access   Private
router.delete('/:invoice_id/:item_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { item_id, invoice_id } = req.params;

    Invoice.findById(invoice_id).then(invoice => {
        if (invoice.created_by.toString() !== req.user.id) {
            return res.status(403).json({ err: 'Unauthorize!' })
        }
        invoice.items.pull({ _id: item_id })
        invoice.save().then(doc => res.status(200).json(doc)).catch(err => console.log(err))
    })
})


module.exports = router;