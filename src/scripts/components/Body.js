import React, {Component} from 'react';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import Signup from './Signup.js';
import Login from './Login.js';


class Body extends Component{
	render(){
		if(this.props.showLogin){

			return(
				<Login login={this.props.login}/>
			);
		}else{

			return(
				<Signup register={this.props.register}/>
			);
		}
		
	}
}

module.exports = Body;