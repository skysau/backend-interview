const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    datetime: {type:Date},
    totalfee:  {type:Number},
    orderBy:  {type:String},
    services:[{
        id:{type:String},
        name:{type:String}
    }]
},
{
    collection:'order',
});
 module.exports=mongoose.model('productSchema',orderSchema);