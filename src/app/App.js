import React, { Component } from 'react';
import './App.css';
import Home from './pages/Home';
import CityEvents from './pages/CityEvents';
import { Switch, Route } from 'react-router-dom';
import Header from './partials/Header';
import Footer from './partials/Footer';


class App extends Component {

	render() {
		return (
			<React.Fragment>
				<div id="wrapper">
					<Header />
					<Switch>
						<Route exact path="/:city" component={CityEvents} />
						<Route exact path="/" component={Home} />
					</Switch>
					<div id="push"></div>
				</div>
				<Footer />
			</React.Fragment>
		);
	}
}

export default App;
