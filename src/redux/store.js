import { configureStore } from '@reduxjs/toolkit';
import agendaSlice from './slices/agendaSlice';
import typeAgendaSlice from './slices/typeAgendaSlice';
import departmentSlice from './slices/departmentSlice';
import lecturerReducer from './reducer/lecturerReducer'
import departmentReducer from './reducer/departmentReducer'

export default configureStore({
	reducer: {
		agenda: agendaSlice,
		typeAgenda: typeAgendaSlice,
		department: departmentSlice,
		fetchLecturers: lecturerReducer,
		fetchDepartments: departmentReducer,
		postDepartmentData: departmentReducer,
		deleteDepartmentData: departmentReducer
	},
});
