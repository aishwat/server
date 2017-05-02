import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import * as Colors from 'material-ui/styles/colors';


const paperStyle = {
  position:'fixed',
    top:0,
	left: 0,
	right:0,
	width: 'auto',
	height:'56px',
	backgroundColor: Colors.cyan300,
	opacity: 0,
	display: 'block'
};
const divStyle={
	color:'white',
	marginTop:'8px',
	marginLeft:'20px',
	opacity: 1
}

class Header2 extends Component{

	render(){
		return(

			<Paper style={paperStyle}>
				<div style={divStyle}>
					
				</div>
			</Paper>
		);
	}
}

module.exports = Header2;