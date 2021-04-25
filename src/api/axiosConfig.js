import  axios from 'axios';

export default axios.create({
    baseURL:'https://hacker-backend.herokuapp.com',
    headers: {'X-Requested-With': 'XMLHttpRequest','Content-Type':'application/json'},
});