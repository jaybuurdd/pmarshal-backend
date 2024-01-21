const axios = require('axios');

const axiosInstance = axios.create({
    baseURL: 'https://api.etherscan.io/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

module.exports = axiosInstance