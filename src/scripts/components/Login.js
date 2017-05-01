import React, {Component} from 'react';

import LoginForm from './LoginForm';

class Login extends Component{
	
	render(){
		return(
			 <LoginForm login={this.props.login}/>
		);
	}
}

module.exports = Login;