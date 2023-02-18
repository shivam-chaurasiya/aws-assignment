const connectDB  = require('./db');
const ForsendMail = require('./mailer');
const User = require('./Schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


connectDB();

module.exports.getUser = async (event) => {
    
    const e = await Employee.find();
    console.log('i Shivam');
    return {
      statusCode: 200,
      body: JSON.stringify(e),
    };
}  
module.exports.postUser = async (event) => {
  const user = JSON.parse(event.body);
  const {Firstname, Lastname, Email, password} = user;
  const user1 = new User({
    Firstname,
    Lastname,
    Email,
    password
  })
  
  const data =  await user1.save();
  ForsendMail(Email);
 return {
  statusCode: 200,
  body: JSON.stringify({
      message: "Data Saved",
      data
  }),
};
}

module.exports.userloginfi = (event) =>{
   const parse = JSON.parse(event.body)
   User.find({Email:event.body.Email})
  .exec()
  .then(userlogin =>{
      if(userlogin < 1){
          return {
              statusCode: 401,
              body: JSON.stringify({
              msg: "USER NOT FOUND"
              })
          }
      }
      bcrypt.compare(event.body.password,userlogin[0].password,(err,result) =>{
          if(!result){
              return {
                statusCode: 401,
                body: JSON.stringify({
                msg: "password not matched"
                })
              }
          }
          if(result){
             const token = jwt.sign({
             Firstname:userlogin[0].Firstname,
             Email:userlogin[0].Email
           },
           key,
           {
              expiresIn:"24h"
           }
           );
           return{
            statusCode:200,
            body: JSON.stringify({
              Firstname: userlogin[0].Firstname,
              Lastname: userlogin[0].Lastname,
              Email:userlogin[0].Email,
              token:token
            })
           }
          }
      })
  })
  .catch(err =>{
      return{
        statusCode:500,
        body: JSON.stringify({
          error:err
        })
      }
  })
  
}




  


