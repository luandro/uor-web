import React from 'react';

const styles = {
	container: {
		width: '100%',
		textAlign: 'center',
		top: '25%'
	}
}

export default ({small = false}) => (
	<div style={Object.assign({},
			styles.container,
			(small) ? {position: 'static'} : {position: 'absolute'}
		)
	}>
		<img src="/icons/logo.svg" height="60" width="auto" style={
			Object.assign({},
				styles.container,
				(small) ? {display: 'none'} : {display: 'block'}

			)
		}/>
		<img src="/icons/loader.svg" style={(small) ? {height: 35, marginTop: 40, padding: '50px auto'} : {height: 60, marginTop: 40, clear: 'both'}} />
	</div>
)
