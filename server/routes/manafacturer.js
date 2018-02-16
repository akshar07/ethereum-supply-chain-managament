const mongoose=require('mongoose');

//import contract
const SCMContract=require('../contract').contract;
const abi= require('../contract').ABI;
const contractAddress=require('../contract').address;

// import schema
const TransactionSchema=require('../Schema/transactionSchema');

//import Tr function
const sendTxn=require('../rawTx');
const manafactuerRouting=require('express').Router();

//manafacturere routes
manafactuerRouting.post('/addCar',function(req,res){
    let name=req.body.name;
    let type="manafacturer";
    let number=req.body.no;
    let publicKey=req.body.publicKey;
    let privateKey=req.body.privateKey;
    let data= addCar(publicKey,
                    privateKey,
                    name,type,number);
    res.send(data);
});
manafactuerRouting.get('/oneCar',function(req,res){
    SCMContract.methods.getCar().call(function(error,result){
        if(error){
            res.status(400).send(error);
        }
        else{
            res.status(200).send(result);
        }
    })
});

//ethereum transactions
const GAS_LIMIT = 4000000; // should not be a constant if using real money
const GAS_PRICE = 20000000000;

function addCar(senderAddress, privateKey,_name,_type,_number){
    web3.eth.getTransactionCount(senderAddress).then((txnCount) => {
        let carNumberinBytes=web3.utils.asciiToHex(_number);
        var contract = new web3.eth.Contract(abi, contractAddress);
        var placeMethod=contract.methods.addCar(_name,carNumberinBytes,_type,_number);
        var encodedABI = placeMethod.encodeABI();
        var addTx = {
            from: senderAddress,
            to: contractAddress,
            nonce: web3.utils.toHex(txnCount),
            gasLimit: web3.utils.toHex(GAS_LIMIT),
            gasPrice: web3.utils.toHex(GAS_PRICE),
            data: encodedABI,
          };
          let hash= sendTxn(privateKey, addTx,function(trHash){
            console.log("ran db");
          });
          console.log(hash)
          return hash;
    }).catch((err) => {
        console.log("web3 err", err);
    })
}
module.exports =manafactuerRouting;