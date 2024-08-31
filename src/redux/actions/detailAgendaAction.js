export const SET_SELECTED_AGENDA = 'SET_SELECTED_AGENDA';
export const CLOSE_DETAIL_AGENDA = 'CLOSE_DETAIL_AGENDA';

export const setSelectedAgenda = (agenda) => ({
	type: SET_SELECTED_AGENDA,
	payload: agenda,
});

export const closeDetailAgenda = () => ({
	type: CLOSE_DETAIL_AGENDA,
});
