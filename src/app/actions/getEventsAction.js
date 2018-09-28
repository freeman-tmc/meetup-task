import fetchJsonp from 'fetch-jsonp';

const allEvents = [];
const getEventsAction = (url) => (dispatch) => {
	dispatch({
		type: 'FETCH_EVENTS_REQUEST'
	});
	return fetchJsonp(url, { jsonpCallbackFunction: 'load' })
		.then(response => {
			console.log(response, 'broj');
			if (!response.ok) {
				dispatch({
					type: 'FETCH_EVENTS_ERROR',
					});
			} else {
				console.log('ovo');

			return response.json();
			}
		})
		.then(body => {
	
			allEvents.push(...body.data.events);
			if (body.meta.next_link) {
				return getEventsAction(body.meta.next_link)(dispatch);
			} 
			else {
                console.log(allEvents);
                
				dispatch({
					type: 'FETCH_EVENTS_SUCCESS',
					payload: allEvents
				});
			}
		})
		.then(() => {
			dispatch({
				type: 'FETCH_EVENTS_SUCCESS',
				payload: allEvents
			});
		})
		.catch(() => {
			dispatch({
				type: 'FETCH_CONNECTION_ERROR'
			});
		});
}

export default getEventsAction;
