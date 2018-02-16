const mongoose=require('mongoose');

const TransactionSchema=new mongoose.Schema({
    sender:String,
    target:String,
    carId:Number,
    address:String
});

module.exports=TransactionSchema;