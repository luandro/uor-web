import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Home from '../components/Home'

import React from 'react';

export default ({}) => (
	<div>
		<Home />
	</div>
)

// function mapStateToProps(state) {
//   return {
//     // entities: state.entities,
//     // points: state.entities.points
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(PointActions, dispatch)
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Home)
