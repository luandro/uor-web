import React, {Component} from 'react';
import {connect} from 'react-redux';
import {pushPath} from 'redux-simple-router';
import falcor from 'falcor';
import Radium, { Style } from 'radium';
import Home from '../../Home/containers/HomeContainer.js';

class App extends Component {
	componentDidMount() {
		const ua = window.__UA__;
		console.log("window.__UA__:", ua.device.type);
	}
	render() {
		const {dispatch} = this.props;
		console.log("this.props:", this.props)
		// console.log("require.ensure:", require.ensure);
		return (
			<div style={{width: '100%', height: '100%'}}>
				<Style rules={{
					'body, html': {
			    		margin: 0,
			    		padding: 0,
			    		height: '100%',
			    		width: '100%'
			  		},
			  		'#react-tools': {
			  			margin: 0,
			  			padding: 0,
			  			height: '100%'
			  		},
			  		'.active': {
			  			fontWeight: 900
			  		}

				}} />
				<button onClick={() => dispatch(pushPath('/home'))}>Home</button>
				<button onClick={() => dispatch(pushPath('/'))}>Root</button>
				{this.props.children || 'Welcome'}
			</div>
		);
	}
}

export default connect()(App)
