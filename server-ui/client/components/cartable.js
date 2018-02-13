import React from'react';

export const CarTable=(props)=>{
    if(props.cars.length>0){
        return(
            <div>
            <hr />
                <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Car Name</th>
                    <th>Car Number</th>
                    <th>Car Id</th>
                </tr>
                </thead>
                <tbody>
                    {props.cars.map(car=>{
                        return (
                            <tr> 
                                <td>{car.name}</td>
                                <td>{car.number}</td>
                                <td>{car.id}</td>
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

export default CarTable;