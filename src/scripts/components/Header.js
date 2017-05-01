import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class Header extends Component{
	render(){
		return(
			 <AppBar title="EnterpriseName" showMenuIconButton={false} 
			 iconElementRight={<RaisedButton label={this.props.showLogin?"Signup":"Login"}/>}  style={{paddingRight:90}} onRightIconButtonTouchTap={()=>this.props.toggleLogin()}/> 
		);
	}
}

module.exports = Header;