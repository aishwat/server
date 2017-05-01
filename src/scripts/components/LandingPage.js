import React from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import * as Colors from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import ArrowDropUp from 'material-ui/svg-icons/navigation/arrow-drop-up';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Done from 'material-ui/svg-icons/action/done';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

import Dispatcher from '../dispatcher/Dispatcher';
import LandingStore from '../stores/LandingStore';
import LandingActions from '../actions/LandingActions';
import Home from './Home';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';

class LandingPage extends React.Component{
	 constructor(props) {
        super(props);
        this.state = {
            showLogin: true
        };
        this._change = this._change.bind(this);
        this._toggleLogin = this._toggleLogin.bind(this);
        // this._subcategoryClicked = this._subcategoryClicked.bind(this);
        // this._answerClicked = this._answerClicked.bind(this);
    }

    componentWillMount() {
        LandingStore.addChangeListener(this._change);
    }

    componentWillUnmount() {
        LandingStore.removeChangeListener(this._change);
    }

	render(){
		return(
			<MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
			<div style={{backgroundColor:Colors.grey200,height:'100vh'}} >
			<Header showLogin={this.state.showLogin} toggleLogin={this._toggleLogin}/>
			<Body showLogin={this.state.showLogin} register={this._register} login={this._login}/>
			<Footer />
			</div>
			</MuiThemeProvider>
		);
	}

	_change(){
		this.setState(LandingStore.getModel());
	}

	_toggleLogin(){
		LandingActions.toggleLogin();
	}

	_register(formValue){
		LandingActions.register(formValue);
	}

	_login(formValue){
		
		LandingActions.login(formValue);
	}
};

module.exports = LandingPage;