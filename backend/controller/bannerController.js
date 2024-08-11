
const {getPool} = require('../connection/connectSql')
const getBanner = async(req,res)=>{
  try {
    // get banner form db
    const connection = getPool();
    if(!connection){
        res.status(500).send({message:'Somethng went wrong!!!'});
    }
    const query = `
    SELECT title,description,image_url,time_remaning FROM banner 
    WHERE active = true
    ORDER BY priority ASC
    limit ? ,100`;
    const [result] = await connection.query(query,[0]);
    res.status(200).json({
        success:true,
        data:result,
        message:"Banner data!!!"
    })
    
  } catch (error) {
    res.status(500).json({
        success:false,
        message:error.message
    })
  }

}

module.exports  = {getBanner}
