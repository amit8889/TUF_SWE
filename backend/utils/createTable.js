const {getPool} = require('../connection/connectSql');


const createBannerTable = async()=>{
    try {
        const connection =getPool();
        //pool connection automatically released just after fisnished the work no need to release
        if(!connection){
            console.log('no connection');
            return;
        } 
        const query = `
            CREATE TABLE IF NOT EXISTS banner (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                image_url VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                active BOOLEAN DEFAULT TRUE,
                priority INT DEFAULT 0,
                time_remaning INT DEFAULT 0
            );
        `
        const result = await connection.query(query);
        console.log(result);
    } catch (error) {
        console.log("==============error in creation of banner table======")
        console.log(error)
    }
}

module.exports = {createBannerTable};