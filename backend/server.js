// config dot env
require('dotenv').config();
const app = require('./app');
const {createBannerTable}   = require('./utils/createTable')


// connect db
const {init}  = require('./connection/connectSql')
// port for server
const PORT = process.env.PORT || 8000;
// connect db
const serverSetUp =async()=>{
    try {
        await init()
        console.log("connect db success")
        //now create table if not exist
        await createBannerTable();
        // creating server
        app.listen(PORT,()=>{
            console.log(`server is running on port ${PORT}`);
        })

    }catch (error) {
        console.log("===error in server setup=====")
        console.log(error);
    }
}

serverSetUp();








