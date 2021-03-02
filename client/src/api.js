

import axios from 'axios'

//const baseURL = '/api'
//const baseURL = 'http://localhost:5000/api'
const baseURL = process.env.VUE_APP_API_URL

export default axios.create({baseURL});

