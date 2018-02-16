import React,{Component} from 'react';
import {
    Link
  } from 'react-router-dom';
class Header extends Component{
    constructor(props){
        super(props);
        this.state={
            activeTab:'home'
        }
        this.handleActive=this.handleActive.bind(this);
    }
    handleActive(nav){
        this.setState({
            activeTab:nav
        })
    }
    render(){
        return(
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Supply Chain Tracker</a>
                    </div>
                    <ul className="nav navbar-nav">
                        <li className={this.state.activeTab==='home'?'active':''} onClick={()=>this.handleActive('home')}>
                            <Link to="/">Home </Link>
                        </li>
                        <li className={this.state.activeTab==='manafacturer'?'active':''} onClick={()=>this.handleActive('manafacturer')}>
                            <Link to="/manafacturer">Manafacturer</Link>
                        </li>
                        <li className={this.state.activeTab==='regulator'?'active':''} onClick={()=>this.handleActive('regulator')}>
                            <Link to="/regulator">Regulator</Link>
                        </li>
                    </ul>
                    </div>
                </nav>
            </div>
        )
    }

}

export default Header;