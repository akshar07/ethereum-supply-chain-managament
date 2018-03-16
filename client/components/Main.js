import React,{Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,Switch
  } from 'react-router-dom';
import App from './App';
import Manafacturer from './manafacturer';
import Header from './Header';
import Regulator from './Regulator';
class Main extends Component{
    render(){
        return (
            <div>
            <Header />
                <Switch>
                <Route exact path='/' component={App}/>
                <Route path='/manafacturer' component={Manafacturer}/>
                <Route path='/regulator' component={Regulator}/>
              </Switch>
            </div>
        )
    }
}

export default Main;