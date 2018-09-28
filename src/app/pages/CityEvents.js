import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Event from './Event';

const CityEvents = (props) => {
    
    let events = props.state.allEvents.filter(el => {
        return el.venue.city === props.match.params.city;
    });

    if (events.length > 0) {
        return (
            <React.Fragment>
                <h1 className="heading">Location: {props.match.params.city}</h1>
                <main>
                    {events.map((el, i) => <Event {...el} key={i} />)}
                </main>
            </React.Fragment>
        );
    } else {
        props.history.push('/');
        return '';
    }
 
}

const mapStateToProps = (state) => {
    return {
        state
    }
}

export default withRouter(connect(mapStateToProps)(CityEvents));
