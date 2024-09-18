import { configureStore } from '@reduxjs/toolkit';
import agendaSlice from './slices/agendaSlice';
import typeAgendaSlice from './slices/typeAgendaSlice';
import departmentSlice from './slices/departmentSlice';

export default configureStore({
	reducer: {
		agenda: agendaSlice,
		typeAgenda: typeAgendaSlice,
		department: departmentSlice,
	},
});
