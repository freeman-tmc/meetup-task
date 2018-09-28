import fetchJsonp from 'fetch-jsonp';

const allEvents = [];

const getEventsAction = (url) => (dispatch) => {
	return fetchJsonp(url, { jsonpCallbackFunction: 'load' })
		.then(response => {
			// checking for response status
			if (!response.ok) {
				dispatch({
					type: 'FETCH_EVENTS_ERROR',
				});
			} else {
				return response.json();
			}
		})
		.then(body => {
			allEvents.push(...body.data.events);
			// if more pages exists call getEventsAction with next page link
			if (body.meta.next_link) {
				return getEventsAction(body.meta.next_link)(dispatch);
			}
			else {
				dispatch({
					type: 'FETCH_EVENTS_SUCCESS',
					payload: allEvents
				});
			}
		})
		.catch(() => {
			dispatch({
				type: 'FETCH_CONNECTION_ERROR'
			});
		});
}

export default getEventsAction;
