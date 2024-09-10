import { configureStore } from '@reduxjs/toolkit';
import detailAgendaReducer from './reducer/detailAgendaReducer';
import agendaSlice from './slices/agendaSlice';
import lecturerReducer from './reducer/lecturerReducer'
import departmentReducer from './reducer/departmentReducer'

export default configureStore({
	reducer: {
		agenda: agendaSlice,
		datailAgenda: detailAgendaReducer,
		fetchLecturers: lecturerReducer,
		fetchDepartments: departmentReducer,
	},
});
