import React, {Component} from 'react';
import falcor from 'falcor';
import Radium, { Style } from 'radium';

export default class extends Component {
	componentDidMount() {
		const model = new falcor.Model({
		    // source: new falcor.HttpDataSource( 'model.json', {
		    //     headers: {
		    //         'Authorization': `bearer ' + token` // JWT
		    //     },
		    //     withCredentials: true, // Cookies
		    //     crossDomain: true // CORS
		    // })
		})
		console.log("window.__UA__:", window.__UA__)
	}
	render() {
		// console.log("require.ensure:", require.ensure)
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
				{this.props.children}
			</div>
		);
	}
}
