import React,{Component} from 'react';
import '../css/manafacturer.css';
import axios from 'axios';
import {CarTable} from './cartable';
  export class Manafacturer extends Component{
    constructor(props){
        super(props);
        this.state={
            carName:"",
            carNumber:"",
            privateKey:"",
            publicKey:"",
            targetAddress:"",
            numberQuery:"",
            isBeingTransferred:false,
            carId:0,
            searchResult:[]
        }
        this.handleNameChange=this.handleNameChange.bind(this);
        this.handleNumberChange=this.handleNumberChange.bind(this);
        this.handlePrivateKeyChange=this.handlePrivateKeyChange.bind(this);
        this.handlePublicKeyChange=this.handlePublicKeyChange.bind(this);
        this.handleNewCar=this.handleNewCar.bind(this);
        this.handleCarQuery=this.handleCarQuery.bind(this);
        this.getMyCars=this.getMyCars.bind(this);
        this.addNewCar=this.addNewCar.bind(this);
        this.setIdForTransfer=this.setIdForTransfer.bind(this)
        this.transferCar=this.transferCar.bind(this);
        this.handleBack=this.handleBack.bind(this);
    }
    addNewCar(){
        axios.post('manafacturer/addCar',{
            name: this.state.carName,
            no:this.state.carNumber,
            privateKey:this.state.privateKey,
            publicKey:this.state.publicKey
        }).then(function(response){
            console.log(response);
        }).catch(function(error) {
            console.log(error);
        });
    }
    getMyCars() {
        axios.get('/myCars',{
            params:{
                address:this.state.publicKey
            }
        }).then((cars)=>{
            this.setState({searchResult:cars.data})
            console.log(this.state.searchResult)
        });

    }
    handleNameChange(e) {
        this.setState({carName: e.target.value});
    }
    handleNumberChange(e){
        this.setState({carNumber: e.target.value});
    }
    handlePrivateKeyChange(e) {
        this.setState({privateKey: e.target.value});
    }
    handlePublicKeyChange(e){
        this.setState({publicKey: e.target.value});
    }    
    handleNewCar(){
        this.props.addNewCar(this.state.carName,this.state.carNumber,this.state.publicKey,this.state.privateKey);
    }
    handleCarQuery(e){
        this.setState({numberQuery: e.target.value});
    }
    getCar(){
        axios.get('/manafacturer/getCar',{
          params:{
            carNumber:this.state.numberQuery
          }
        }).then((response)=> {
          console.log(response);
          this.setState({searchResult:response.data.name}).bind(this);
          console.log(this.state.searchResult);
        })
      }
      setIdForTransfer(id){
        this.setState({
            carId:id,
            isBeingTransferred:true
        });
    }
    transferCar(){
        axios.post('/transferCar',{
            privateKey:this.state.privateKey,
            publicKey:this.state.publicKey,
            targetAdd:this.state.targetAddress,
            id:this.state.carId,
        });
    }
    handleTargetAddressChange(e){
        this.setState({targetAddress: e.target.value});
    }
    handleDistributoChange(add){
        this.setState({targetAddress: add});
    }
    handleBack(){
        this.setState({isBeingTransferred:false})
    }
    render(){
        let carDetails=null;
        let transferButton=null;
        let transferSection=null;
        let backButton=null;
        if(!this.state.isBeingTransferred){
            carDetails=<div>
                            <div className="col-lg-4">
                                Car Name: <input type="text" name="name" value={this.state.carName} onChange={this.handleNameChange}/>                     
                            </div>
                            <div className="col-lg-4">
                                Car Number: <input type="text" name="number" value={this.state.carNumber} onChange={this.handleNumberChange}/>                    
                            </div>
                            <br />
                            <button onClick={this.addNewCar} >Add Car</button>
                        </div>

        }
        if(this.state.isBeingTransferred){
            transferSection=
                <div className="right">
                    Traget Address: <input type="text" name="target" value={this.state.targetAddress} onChange={this.handleTargetAddressChange}/> <br />
                    <p>Or Choose one of the Following Distributor</p>
                    <ul>
                        <li onClick={()=>this.handleDistributoChange("0xc5Bd1de6Abc8f9217D94253983362Dd3C06Fb7ca")}>Stevens Creek</li>
                        <li onClick={()=>this.handleDistributoChange("0x75e4402700b548eE98E11CdC8435bd7DC18Cd98e")}>Capitol</li>
                    </ul>
                </div>
        }
        if(this.state.isBeingTransferred){backButton= <button onClick={this.handleBack} className="back">Back</button>}
        if(this.state.isBeingTransferred){transferButton=<button className="transfer" onClick={this.transferCar}>Transfer</button>}
        return(
            <div className="container">
                <h3>For Manafacturer</h3>
                <div className="row">
                    <div className="left col-lg-8">
                        <div className="col-lg-4">
                            Public Key: <input type="text" name="public" value={this.state.publicKey} onChange={this.handlePublicKeyChange}/> 
                        </div>
                        <div className="col-lg-4">
                            Private key : <input type="password" name="private" value={this.state.privateKey} onChange={this.handlePrivateKeyChange}/>                    
                        </div>
                        <div className="clearfix" />
                        <hr />
                         {carDetails}
                         {transferButton}
                         {backButton}
                    </div>
                    <div className="col-lg-4">
                        {transferSection}
                    </div>
                </div>
                    
                <hr />
                <div className="row">
                    Public Key: <input type="text" name="public" value={this.state.publicKey} onChange={this.handlePublicKeyChange}/>
                    <button onClick={this.getMyCars} className="myCars"> Get My Cars</button>
                    <CarTable cars={this.state.searchResult} transferCar={this.setIdForTransfer}/>
                </div>
            </div>
        )
    }
}

export default Manafacturer;