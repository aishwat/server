// window.$ = window.jQuery = require('jquery');
import React from 'react';
import ReactDOM from 'react-dom';
import Login from './scripts/components/Login';
import Home from './scripts/components/Home';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(
	<div className='container-fluid'>
		<Home />
	</div>
	,document.getElementById('app')
);