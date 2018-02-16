import React,{Component} from'react';

 export class CarTable extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedCar:0
        }
        this.handleTranferData=this.handleTranferData.bind(this)
    }
    handleTranferData(id){
        this.setState({
            selectedCar:id
        })
        this.props.transferCar(id);
    }
    render(){
        if(this.props.cars.length>0){
            return(
                <div>
                <hr />
                    <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Car Name</th>
                        <th>Car Number</th>
                        <th>Car Id</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.props.cars.map(car=>{
                            return (
                                <tr className={this.state.selectedCar==car.id?"active":""}> 
                                    <td>{car.name}</td>
                                    <td>{car.number}</td>
                                    <td>{car.id}</td>
                                    <td onClick={()=>this.handleTranferData(car.id)}>Transfer</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
              </div>
            )
        }
        else{
            return(
                <div>
                    <p> Please Enter your Public Address to get your cars!!</p>
                </div>
            )
        }
    
    }
 }


export default CarTable;