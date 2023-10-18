import axios from "axios";

const apiDatabase = 'http://localhost:3001/api/tags';
// read
const getTagsProduk = async () => {
    return await axios({
        method: 'get',
        url: apiDatabase
    })
} 

export default getTagsProduk