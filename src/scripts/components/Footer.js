import React, {Component} from 'react';
import Paper from 'material-ui/Paper';


const paperStyle = {
  position:'fixed',
    bottom:0,
	left: 0,
	right:0,
	width: 'auto',
	height:'40px',
	backgroundColor: 'rgb(0, 188, 212)'
};
const divStyle={
	color:'white',
	marginTop:'8px',
	marginLeft:'20px'

}

class Footer extends Component{

	render(){
		return(

			<Paper style={paperStyle}>
				<div style={divStyle}>
					Brewed With &hearts; at Bengaluru
				</div>
			</Paper>
		);
	}
}

module.exports = Footer;