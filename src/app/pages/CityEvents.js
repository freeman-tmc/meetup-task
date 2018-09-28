import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Event from './Event';


const CityEvents = (props) => {

    let cityEvents = props.state.allEvents.filter(el => {
        console.log(el.venue.city);
        return el.venue.city === props.match.params.city;
    })
    return (
        <React.Fragment>
            <h1 className="heading">Location: {props.match.params.city}</h1>
            <main>
                {cityEvents.map((el, i) => <Event {...el} key={i} />)}
            </main>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        state
    }
}

export default withRouter(connect(mapStateToProps)(CityEvents));
