const config=require('./config/config');
//import contract
const SCMContract=require('./contract').contract;
const abi= require('./contract').ABI;
const contractAddress=require('./contract').address;
//contract end
const express=require('express');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
const util = require('util');
const router = require('./routes/routes.js')
var manafacturerRouter=require('./routes/manafacturer.js');
const path = require('path');
const app = express();
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const express_enforces_ssl = require('express-enforces-ssl');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use('/', router);
app.use('/manafacturer',manafacturerRouter);

const port = config.port;
app.use((err, request, response, next) => {  
    console.log(err);
    response.status(500).send('Something broke! '+ JSON.stringify(err));
  });
//database
const { Pool } = require('pg');
const local_db_url = 'postgres://localhost:5432/webthereum';
const db_url = process.env.DATABASE_URL || local_db_url;
require('pg').defaults.ssl = db_url != local_db_url;
const pool = new Pool({ connectionString: db_url });
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  console.error('client is', client);
  process.exit(-1);
});
  var bodyParser = require('body-parser')
  app.use( bodyParser.json() );       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  })); 
//listen
  app.listen(port, (err) => {  
    if (err) {
      return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`);
  });

  //common 
  app.get('/getCar',function(req,res){ 
    let carNumber=web3.utils.asciiToHex(req.query.carNumber);
    SCMContract.methods.getCar(carNumber).call(function(error,result){
        if(error){
            console.log(error);
        }
        else{
            console.log(result);
            res.send(result);
        }
    })
});
let  getCarIds=function(req,res,next){
    address=req.query.address;
    SCMContract.methods.getCarsByUser(address).call((error,result)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log(result);
            req.body.ids=result;
        }
    }).then(()=> next());
  
}
app.get('/myCars',getCarIds,(req,res)=>{
    let carIds=req.body.ids;
    let counter=0;
    let promises=carIds.map(id=>{
        return getOneCar(parseInt(id)+1);
    })
    Promise.all(promises).then((cars)=>{
        console.log(cars);
        res.send(cars);
    }).catch((error)=>console.log(error));
    
})
function getOneCar(id){
    return SCMContract.methods.getCar(id).call((error,result)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log(result);
        }
    }).then((car)=> {car.id=id;return car}).catch((err=>console.log(err)))

}
//transfer car
transferCar=require('./transferCar');
app.post('/transferCar',(req,res)=>{
    let priKey=req.body.privateKey;
    let pubKey=req.body.publicKey;
    let targetAdd=req.body.targetAdd;
    let carId=req.body.id;
    transferCar(pubKey,priKey,targetAdd,carId);
});
//get transactions
const TransactionSchema=require('./Schema/transactionSchema');
app.get('/allTransactions',(req,res)=>{
    let Transaction= mongoose.model('transaction',TransactionSchema);
    Transaction.find({},(err,doc)=>{
        if(err){

            console.log(err);
        }
        else{
            res.send(doc);
        }
    })
})

module.exports=app;