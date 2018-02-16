//import contract
const SCMContract=require('./contract').contract;
const abi= require('./contract').ABI;
const contractAddress=require('./contract').address;

const TransactionSchema=require('./Schema/transactionSchema');
const mongoose=require('mongoose');
const sendTxn=require('./rawTx');
//ethereum transactions
const GAS_LIMIT = 4000000; // should not be a constant if using real money
const GAS_PRICE = 20000000000;

function transferCar(senderAddress, privateKey,targetAdd,carId){
    web3.eth.getTransactionCount(senderAddress).then((txnCount) => {
        var contract = new web3.eth.Contract(abi, contractAddress);
        var placeMethod=contract.methods.sendFromManToDist(targetAdd,senderAddress,carId,"manafacturer");
        var encodedABI = placeMethod.encodeABI();
        var transferTx = {
            from: senderAddress,
            to: contractAddress,
            nonce: web3.utils.toHex(txnCount),
            gasLimit: web3.utils.toHex(GAS_LIMIT),
            gasPrice: web3.utils.toHex(GAS_PRICE),
            data: encodedABI,
          };
          let hash= sendTxn(privateKey, transferTx,function(trHash){
            console.log("ran db");
            let Transaction= mongoose.model('transaction',TransactionSchema);
            let currentTime=Date.now();
            let transactionModel=new Transaction({
                sender:senderAddress,
                target:targetAdd,
                carId:carId,
                address:trHash
                
            });
            transactionModel.save();
          });
          console.log(hash)
          return hash;
    }).catch((err) => {
        console.log("web3 err", err);
    })
};

module.exports=transferCar;