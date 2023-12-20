const express=require("express");
const mongoConnection=new (require("./src/commonServices/db.connection"))();
const orderRoute = require('./src/router/order.router');
let {PREFIXPATH} = process.env;

const app=express();
require('dotenv').config();


const port= process.env.PORT || 3000;
const apiKey = process.env.API_KEY;



app.use(express.json());

//this is used for user validation 
app.use((req, res, next) => {
    const { key } = req.headers;
  
    if (key === apiKey ) {
      next(); 
    } else {
      res.status(401).json({ message: 'Authentication failed' });
    }
  });
 mongoConnection.dbConnect()


app.use('/api/WIN-Assesment/order',orderRoute);
//app.use("/api/bookings",bookingRoute);
//app.use("/api/singleTableCustomer",singleTableCustomerRoute);


app.listen(port,()=>console.log(`App listening on port no :- ${port}`));