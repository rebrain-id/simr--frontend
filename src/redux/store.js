import { configureStore } from '@reduxjs/toolkit';
import agendaSlice from './slices/agendaSlice';
import typeAgendaSlice from './slices/typeAgendaSlice';
import departmentSlice from './slices/departmentSlice';
import lecturerReducer from './reducer/lecturerReducer';
import departmentReducer from './reducer/departmentReducer';
import authReducer from './reducer/authReduces';

export default configureStore({
	reducer: {
		agenda: agendaSlice,
		typeAgenda: typeAgendaSlice,
		department: departmentSlice,
		fetchLecturers: lecturerReducer,
		postLecturerData: lecturerReducer,
		updateLecturerData: lecturerReducer,
		deleteLecturerData: lecturerReducer,
		fetchDepartments: departmentReducer,
		postDepartmentData: departmentReducer,
		updateDepartmentData: departmentReducer,
		deleteDepartmentData: departmentReducer,
		auth: authReducer,
	},
});
