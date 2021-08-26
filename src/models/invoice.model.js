const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    to: {
        type: String,
        required: true
    },
    order_date: {
        type: String,
    },
    items: [{
        name: {
            type: String
        },
        rate: {
            type: String
        },
        quantity: {
            type: Number
        },
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Invoice = mongoose.model('invoices', InvoiceSchema);