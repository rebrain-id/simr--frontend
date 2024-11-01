export const OPEN_MESSAGE = 'OPEN_MESSAGE';
export const CLOSE_MESSAGE = 'CLOSE_MESSAGE';

export const openMessage = (payload) => ({
	type: OPEN_MESSAGE,
	payload,
});

export const closeMessage = () => ({
	type: CLOSE_MESSAGE,
});
