function sendTxn(privateKey,rawTx,dbInsert){
    var tx = require('ethereumjs-tx');
    var privateKeyBuffer = new Buffer(privateKey, 'hex');
    var transaction = new tx(rawTx);
    transaction.sign(privateKeyBuffer);
    var serializedTx = transaction.serialize().toString('hex');
    web3.eth.sendSignedTransaction(
        '0x' + serializedTx, function(err, txnHash) {
          if(err) {
            console.log("txn err", err);
          } else {
            console.log("txn result", txnHash);
            dbInsert(txnHash);
            return txnHash;
          }
        });
}

module.exports=sendTxn;