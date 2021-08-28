const axios = require('axios')

const baseUrl = 'http://localhost:4001'

export const getInvoice = () => {
    return axios.get(`${baseUrl}/invoice/`)
}

export const removeItem = (invoice_id, item_id) => {
    return axios.delete(`${baseUrl}/invoice/${invoice_id}/${item_id}`)
}