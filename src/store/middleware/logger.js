export const loggerMiddleware = (store) => (next) => (action) => {
	if (!action.type) {
		return next(action);
	}

	console.log(
		'type: ',
		action.type,
		'\npayload: ',
		action.payload,
		'\nstate: ',
		store.getState()
	);

	next(action);

	console.log('next state: ', store.getState());
};
