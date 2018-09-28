import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class CityEvents extends React.Component {
	

	render() {
		let cityEvents = this.props.state.allEvents.filter(el => {
			console.log(el.venue.city);
			
			return el.venue.city == this.props.match.params.city;
		})
		return (
			<div>
				{cityEvents.map((el, i) => <p key={i} >{el.name}</p>)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
    return {
        state
    }
}

// const mapDispatchToProps = {
//     getEventsAction
// }

export default withRouter(connect(mapStateToProps)(CityEvents));