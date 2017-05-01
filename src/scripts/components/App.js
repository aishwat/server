import React from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import LandingPage from './LandingPage';
import Home from './Home';
//import {RouteHandler} from 'react-router';

class App extends React.Component {
	render(){
		return (
			<Router>
			<div>
			  <Route exact path="/" component={LandingPage}/>
		      <Route path="/home" component={Home}/>
		      </div>
			</Router>
			)
	}
};

module.exports = App;