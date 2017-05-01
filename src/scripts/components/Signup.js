import React, {Component} from 'react';
import SignupForm from './SignupForm';

class Signup extends Component{

	render(){
		return(
			 <SignupForm  register={this.props.register}/>
		);
	}
}

module.exports = Signup;
