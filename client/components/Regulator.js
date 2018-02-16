import React, {Component}from 'react';
import axios from 'axios';
import '../css/Regulator.css'
class Regulator extends Component{
    constructor(props){
        super(props);
        this.state={
            results:[]
        }
        
    }
    componentWillMount(){
        console.log("did")
        axios.get('/allTransactions').then((res)=>{
            console.log(res)
            this.setState({
                results:res.data
            })
        });
    }
    render(){
        return(
            <div>
            <hr />
                <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Transaction Hash</th>
                    <th>Sender Address</th>
                    <th>New Owner Address</th>
                    <th>Car Id</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.results.map(tr=>{
                        return (
                            <tr key={tr.carId}> 
                                <td>{tr.address}</td>
                                <td>{tr.sender}</td>
                                <td>{tr.target}</td>
                                <td>{tr.carId}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
          </div>
        )
    }
}

export default Regulator;