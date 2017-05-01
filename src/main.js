// window.$ = window.jQuery = require('jquery');
import React from 'react';
import ReactDOM from 'react-dom';
//import Router from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './scripts/components/App';
//import routes from './scripts/utils/routes';
injectTapEventPlugin();


// Router.run(routes, function(Handler){
// 	ReactDOM.render(
// 		<div className='container-fluid'>
// 			<Handler />
// 		</div>
// 		,document.getElementById('app')
// 	);
// });

ReactDOM.render(
		<div className='container-fluid'>
			<App/>
		</div>
		,document.getElementById('app')
	);