import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
	fetching: true,
	listOfCities: [],
	allEvents: [],
	error: false
};

const middlewares = [thunk];

const eventsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_EVENTS_REQUEST':
			return {...state, fetching: true};
		case 'FETCH_EVENTS_ERROR':
			return {...state, fetching: false, error: 'Error fetching data'};
		case 'FETCH_EVENTS_SUCCESS':
			const cities = [];
			const allEvents = [];
			action.payload.forEach(el => {    
				if (el.venue) {
					if (el.venue.country === 'rs') { 
						console.log('prosao');
						allEvents.push(el);
						if (!cities.includes(el.venue.city)) {
							cities.push(el.venue.city);
						}
					}
				}
			});
			return {...state, listOfCities: cities, allEvents: allEvents};
		case 'FETCH_CONNECTION_ERROR':
			return {...state, error: 'Connection error'};
		default:
			return state;
	}
};

const store = createStore(eventsReducer, initialState, applyMiddleware(...middlewares));

export default store;