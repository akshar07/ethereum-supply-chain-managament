const mongoose=require('mongoose');

const TransactionSchema=new mongoose.Schema({
    name:String,
    carNumber:String,
    address:String,
    trHash:String
});

module.exports=TransactionSchema;