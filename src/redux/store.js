import { configureStore } from '@reduxjs/toolkit';
import detailAgendaReducer from './reducer/detailAgendaReducer';
import agendaSlice from './slices/agendaSlice';

export default configureStore({
	reducer: {
		agenda: agendaSlice,
		datailAgenda: detailAgendaReducer,
	},
});
