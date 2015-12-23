import React, {Component} from 'react';
import {connect} from 'react-redux';
import {pushPath} from 'redux-simple-router';
import { retrievePath } from 'redux-falcor';
import { prefetch, defer } from 'react-fetcher';
import Radium, { Style } from 'radium';
import Home from '../../Home/containers/HomeContainer.js';

class App extends Component {
	// componentWillMount() {
	// 	if(!this.hasData())
	// 		this.props.dispatch(retrievePath('todos[0].name'));
	// }
	componentDidMount() {
		const ua = window.__UA__;
		console.log("window.__UA__:", ua);
		this.props.dispatch(retrievePath('todos[1].name'));
	}
	hasData() {
		if(this.props.todos) {
			return true
		} else {
			return false
		}
	}
	renderLoader() {
		return (
			<p>Loading</p>
		)
	}
	renderComponent() {
		const {dispatch, children, todos} = this.props;
		return (
			<div style={{width: '100%', height: '100%'}}>
				<Style rules={{
					'body, html': {
			    		margin: 0,
			    		padding: 0,
			    		height: '100%',
			    		width: '100%',
			    		fontFamily: 'Ubuntu'
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
				{children || 'Welcome'}
			</div>
		);
	}
	render() {
		if(this.hasData()) {
			return this.renderComponent();
		} else {
			return this.renderLoader();
		}
	}
}

export default connect(
	state => ({todos: state.entities.todos})
)(App)
