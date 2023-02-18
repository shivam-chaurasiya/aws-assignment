const jwt = require('jsonwebtoken');

module.exports = (event) =>{
    
      try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const verify = jwt.verify(token, process.env.KEY);
        console.log(verify);
        next();
      }
      catch(error){
       return {
        statusCode:500,
       body: JSON.stringify({
         msg: 'Invalid token'
       })
    }
       
      }
}