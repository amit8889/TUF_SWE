const { createPool } = require("mysql2/promise");

let pool;

const init = async () => {
  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_DATABASE;
  pool = createPool({
    host,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 1000,
    queueLimit: 0,

  });
  pool.on('acquire',(connection)=>{
    console.log("====================connection acquire ==================== : ",connection.threadId);
 
  })
  pool.on('connection',(connection)=>{
    console.log("====================connection created ==================== : ",connection.threadId);
    // set read lock onlly commited data will read
    connection.query('SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED') 
    connection.query("SET AUTOCOMMIT = 1")

  })
  pool.on('release',(connection)=>{
    console.log("====================connection released ==================== : ",connection.threadId);
 })
 pool.on('enqueue',()=>{
  console.log("====================waiting for avaliable connection ====================");

   })

};

const getConnection = async () => {
  if (!pool) {
    throw new Error("MySQL connection pool is not initialized");
  }
  return await pool.getConnection();
};

const getPool = () => {
  return  pool;
};

module.exports = { init, getConnection,getPool };
