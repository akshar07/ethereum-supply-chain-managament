import React, { Component } from 'react';
import '../css/App.css';




class App extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div className="App container">
      <h1>Welcome to Web Ethereum Supply Chain Management Tracker</h1>

      <div className="directions">
          <h3> Directions to use this application </h3>
          <p>
            1. First you need an address and private key. 
            Dont worry about the security, you are not using this for real money!
            If you were using this for real money, you'd be much, much more careful about this process, though, right?
          </p> 
          <p>
            2. After completeing step 1, you would be given an option to download the 'keystore file'. Download it. 
          </p>
          <p>
            3. Go back to EtherWaallet - select 'view wallet info'- upload your key and enter the same password. 
          </p>
          <p>  
            4.You will have your public address and private key available to you. Use this in the application for transactions. 
          </p>
          <hr />
          <h4>You will need fake money (ether) to run the transactions. You can get them online too! &#9975;</h4>
            <p> 
              Head over here: <a href="https://faucet.rinkeby.io/"> https://faucet.rinkeby.io/</a> follow the instructions and wait for about a minute. 
              You will have minimum 3 ether in your account &#10024; &#10024; &#10024;- which is more than what you need to run the transactions. 
            </p>
            <hr />
            <h4> Finally </h4>
            <p> Enter your public key, private key, your favorite car name and its number (like a number plate) </p>
            <p> After adding your car, you can query it and and transfer it to any one (with a valid public address) or some sample car distributors.</p>
            <p>All the transactions happening on the network will get recorded for the regulator to check. </p>
            <hr />
            <p>Source code can be found at : <a href="https://github.com/akshar07/ethereum-supply-chain-managament"> Github</a></p>
            <p>Your thoughts and feedbacks are important, feel free to message me on: <a href="mailto:takleakshar@gmail.com">takleakshar@gmail.com</a></p>
      </div>
    </div>
    );
  }
}

export default App;
