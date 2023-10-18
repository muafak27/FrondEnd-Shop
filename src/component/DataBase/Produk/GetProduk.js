import axios from "axios";

const apiDatabase = 'http://localhost:3001/api/products?limit=10000';
// read
const getProduk = async () => {
    return await axios({
        method: 'get',
        url: apiDatabase
    })
} 

export default getProduk