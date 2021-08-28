import setAuthToken from '../utils/setAuthToken.utils';

const axios = require('axios')

const baseUrl = 'http://localhost:4001'

export const login = (email, password) => {
    return axios.post(`${baseUrl}/users/login`, { email, password }).then(ress => {
        const { token } = ress.data;
        localStorage.setItem('token', token);
        setAuthToken(token);
    })
}