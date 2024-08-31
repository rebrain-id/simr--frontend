import { configureStore } from '@reduxjs/toolkit';
import detailAgendaReducer from './reducer/detailAgendaReducer';

export default configureStore({
	reducer: {
		datailAgenda: detailAgendaReducer,
	},
});
