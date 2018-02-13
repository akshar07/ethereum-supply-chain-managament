import React, { Component } from 'react';
import '../css/App.css';
import axios from 'axios';
import {Manafacturer} from './manafacturer';

const NavBar=()=>{
  return (
    <div>
    <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <a className="navbar-brand" href="#">Supply Chain Tracker</a>
      </div>
      <ul className="nav navbar-nav">
        <li className="active"><a href="#">Home</a></li>
        <li><a href="#">Manafacturer</a></li>
        <li><a href="#">Distributor</a></li>
        <li><a href="#">Dealer</a></li>
      </ul>
    </div>
  </nav>
    </div>
  )
}
class App extends Component {
  constructor(props){
    super(props)
    this.state={
        name:"",
        number:"",
        publicKey:"",
        privateKey:""
    }
    this.addNewCar=this.addNewCar.bind(this);
  }
componentDidMount() {

}
addNewCar(_name,_number,_publicAddress,_privateKey){
  console.log(_name)
  axios.post('manafacturer/addCar',{
      name: _name,
      no:_number,
      privateKey:_privateKey,
      publicKey:_publicAddress
  }).then(function(response){
      console.log(response);
  }).catch(function(error) {
      console.log(error);
  });
  }
  render() {
    return (
      <div className="App">
        <NavBar />
        <Manafacturer addNewCar={this.addNewCar}/>
      </div>
    );
  }
}

export default App;
