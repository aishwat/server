import React from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import {Card, CardTitle, CardHeader} from 'material-ui/Card';

const style = {
	// height: 300,
	// width: 300,
	margin: 200,
	// textAlign: 'center',
	display: 'block'
};

const cardStyle = {
  marginRight:70,
  marginLeft:'auto',
  marginTop: 70,
  padding:40,
  width: '350px'
};

class Login extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            	<div>
	            	<Card style={cardStyle} >
	            	{<CardTitle title="Login" />}
	            		<form>
            				<TextField hintText='Enter email'/>
            				<TextField hintText='Enter password'/>
	            		</form>
	            	</Card>
            	</div>
            </MuiThemeProvider>
        );
    }
};

module.exports = Login;