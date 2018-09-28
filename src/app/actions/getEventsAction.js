

// let allData = [];

// const getEventsAction = (url) => (dispatch) =>{
//       // Dispatching REQUEST action, which tells our app, that we are started requesting todos.
//       dispatch({
//         type: 'FETCH_EVENTS_REQUEST'
//       });
//       return fetch('/api/todos')
//         // Here, we are getting json body(in our case it will contain `todos` or `error` prop, depending on request was failed or not) from server response
//         // And providing `response` and `body` variables to the next chain.
//         .then(response => response.json().then(body => ({ response, body })))
//         .then(({ response, body }) => {
//           if (!response.ok) {
//             // If request was failed, dispatching FAILURE action.
//             dispatch({
//               type: 'FETCH_EVENTS_FAILURE',
//               error: body.error
//             });
//           } else {
//             // When everything is ok, dispatching SUCCESS action.
//             dispatch({
//               type: 'FETCH_EVENTS_SUCCESS',
//               todos: body.todos
//             });
//           }
//         });
//     }
//   }

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
			// console.log(body);
			// console.log(body.meta.next_link);

			allEvents.push(...body.data.events);
			if (body.meta.next_link) {
				return getEventsAction(body.meta.next_link);
			} 
			// else {
			// 	dispatch({
			// 		type: 'FETCH_EVENTS_SUCCESS',
			// 		payload: allEvents
			// 	});
			// }
		})
		.then(() => {
			dispatch({
				type: 'FETCH_EVENTS_SUCCESS',
				payload: allEvents
			});
		})
		// .catch(() => {
		// 	dispatch({
		// 		type: 'FETCH_CONNECTION_ERROR'
		// 	});
		// });
}

export default getEventsAction;