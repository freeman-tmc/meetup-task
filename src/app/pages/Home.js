import React from 'react';
import { connect } from 'react-redux';
import getEventsAction from '../actions/getEventsAction';

class Home extends React.Component {

    componentDidMount() {
        const url = 'https://api.meetup.com/find/upcoming_events?photo-host=public&page=20&country=rs&sig_id=264146852&sig=1035e45500707509e5f074f9551ce2e14e3cceab';
        this.props.getEventsAction(url);
    }

    showDetails = (city) => {
        this.props.history.push('/' + city);
    }

    render() {
        console.log(this.props.state.fetching);
        
        return (
            <React.Fragment>
                <h1 className="heading">Locations</h1>
                <main>
                    {this.props.state.fetching
                        ? <div className="loader"></div>
                        : this.props.state.listOfCities.map((el, i) => <p className="city" key={i} onClick={() => this.showDetails(el)}>{el}</p>)
                    }
                </main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state
    }
}

const mapDispatchToProps = {
    getEventsAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
