import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MobileList from '../components/MobileList'

import React from 'react';

export default ({}) => (
	<div>
		<MobileList />
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

// export default connect(mapStateToProps, mapDispatchToProps)(MobileList)
