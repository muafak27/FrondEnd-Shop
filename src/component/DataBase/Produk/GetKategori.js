import axios from "axios";

const apiDatabase = 'http://localhost:3001/api/categories';
// read
const getKategori = async () => {
    return await axios({
        method: 'get',
        url: apiDatabase
    })
} 

export default getKategori