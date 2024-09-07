import { configureStore } from '@reduxjs/toolkit';
import detailAgendaReducer from './reducer/detailAgendaReducer';
import agendaSlice from './slices/agendaSlice';
import dosenReducer from './reducer/dosenReducer'

export default configureStore({
	reducer: {
		agenda: agendaSlice,
		datailAgenda: detailAgendaReducer,
		fetchDosens: dosenReducer
	},
});
