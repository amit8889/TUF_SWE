
const {getPool} = require('../connection/connectSql')
const createBanner = async(req,res)=>{
  try {
    // get banner form db
    const connection = getPool();
    if(!connection){
        res.status(500).send({message:'Somethng went wrong!!!'});
    }
    //excrat data
    const {title,description,image_url,active,priority,time_remaning} = req.body

    const query =`INSERT INTO banner (title,description,image_url,active,priority,time_remaning) VALUES (?, ?, ?, ?, ?, ?)`
    // execute qury
    const [result] = await connection.query(query,[title,description,image_url,active,priority,time_remaning]);
    res.status(200).json({
        success:true,
        message:"Banner created successfully!!!"
    })
    
  } catch (error) {
    res.status(500).json({
        success:false,
        message:error.message
    })
  }

}

const updateBanner = async (req, res) => {
  const connection = getPool();

  if (!connection) {
    return res.status(500).send({ message: 'Something went wrong!!!' });
  }

  try {
    // Extract banner ID and data from request body
    const { bannerId, ...data } = req.body;

    if (!bannerId) {
      return res.status(400).json({ success:false,message: 'Banner ID is required' });
    }

    // Construct the SQL query
    let updateQuery = 'UPDATE banner SET ';
    const values = [];
     // Dynamically build the query and values array
    Object.entries(data).forEach(([key, value], index) => {
      updateQuery += `${key} = ?${index < Object.entries(data).length - 1 ? ', ' : ' '}`;
      values.push(value);
    });

    updateQuery += 'WHERE id = ?';
    values.push(bannerId);

    console.log('Update Query:', updateQuery);
    console.log('Values:', values);

    // Execute the query
    const [result] = await connection.query(updateQuery, values);

    console.log('Update Result:', result);
    if (result.affectedRows === 0) {
        return res.status(404).json({ success:false,message: 'Banner not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Banner updated successfully!!!'
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const getBanner = async(req,res)=>{
    try {
      // get banner form db
      const connection = getPool();
      if(!connection){
          res.status(500).json({success:false,message:'Somethng went wrong!!!'});
      }
      const query = `
        SELECT * FROM banner 
        ORDER BY created_at DESC
      `;
      const [result] = await connection.query(query,[0]);
     // console.log(result)
      res.status(200).json({
          success:true,
          data:result,
          message:"Dashboard Banner data!!!"
      })
      
    } catch (error) {
      res.status(500).json({
          success:false,
          message:error.message
      })
    }
  
  }

module.exports  = {createBanner,updateBanner,getBanner}
