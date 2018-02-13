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
            numberQuery:"",
            searchResult:[]
        }
        this.handleNameChange=this.handleNameChange.bind(this);
        this.handleNumberChange=this.handleNumberChange.bind(this);
        this.handlePrivateKeyChange=this.handlePrivateKeyChange.bind(this);
        this.handlePublicKeyChange=this.handlePublicKeyChange.bind(this);
        this.handleNewCar=this.handleNewCar.bind(this);
        this.handleCarQuery=this.handleCarQuery.bind(this);
        this.getMyCars=this.getMyCars.bind(this);

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
    render(){
        return(
            <div className="container">
                <h3>For Manafacturer</h3>
                <div className="row">
                    <div className="col-lg-4">
                        Public Key: <input type="text" name="public" value={this.state.publicKey} onChange={this.handlePublicKeyChange}/> 
                    </div>
                    <div className="col-lg-4">
                        Private key : <input type="password" name="private" value={this.state.privateKey} onChange={this.handlePrivateKeyChange}/>                    
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        Car Name: <input type="text" name="name" value={this.state.carName} onChange={this.handleNameChange}/>                     
                    </div>
                    <div className="col-lg-4">
                        Car Number: <input type="text" name="number" value={this.state.carNumber} onChange={this.handleNumberChange}/>                    
                    </div>
                </div>
                <button onClick={this.handleNewCar} >Add Car</button>
                <hr />
                <div className="row">
                    Public Key: <input type="text" name="public" value={this.state.publicKey} onChange={this.handlePublicKeyChange}/>
                    <button onClick={this.getMyCars} className="myCars"> Get My Cars</button>
                    <CarTable cars={this.state.searchResult} />
                </div>
            </div>
        )
    }
}

export default Manafacturer;