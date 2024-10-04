import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Login from '../pages/auth/Login';
import Dashboard from '../pages/Dashboard';
import Agenda from '../pages/agendas/Agenda';
import Department from '../pages/Department';
import Lecturer from '../pages/Lecturer';
import AgendaByDate from '../pages/agendas/AgendaByDate';
import AddAgenda from '../pages/agendas/AddAgenda';
import NotFound from '../pages/errors/404';
import ChangePassword from '../pages/auth/ChangePassword';
import ProtectedRoute from './ProtectedRoute';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				index: true,
				element: (
					<ProtectedRoute authorized={['PRODI', 'FAKULTAS']}>
						<Dashboard />
					</ProtectedRoute>
				),
			},
			{
				path: 'agenda',
				element: (
					<ProtectedRoute authorized={['PRODI', 'FAKULTAS']}>
						<Agenda />
					</ProtectedRoute>
				),
			},
			{
				path: 'agenda/date',
				element: (
					<ProtectedRoute authorized={['PRODI', 'FAKULTAS']}>
						<AgendaByDate />
					</ProtectedRoute>
				),
			},
			{
				path: 'agenda/new',
				element: (
					<ProtectedRoute authorized={['PRODI', 'FAKULTAS']}>
						<AddAgenda />
					</ProtectedRoute>
				),
			},
			{
				path: 'agenda/date',
				element: (
					<ProtectedRoute authorized={['PRODI', 'FAKULTAS']}>
						<AgendaByDate />,
					</ProtectedRoute>
				),
			},
			{
				path: 'agenda/new',
				element: (
					<ProtectedRoute authorized={['PRODI', 'FAKULTAS']}>
						<AddAgenda />
					</ProtectedRoute>
				),
			},
			{
				path: 'prodi',
				element: (
					<ProtectedRoute authorized={['PRODI', 'FAKULTAS']}>
						<Department />
					</ProtectedRoute>
				),
			},
			{
				path: 'dosen',
				element: (
					<ProtectedRoute authorized={['PRODI', 'FAKULTAS']}>
						<Lecturer />
					</ProtectedRoute>
				),
			},
			{
				path: 'change-password',
				element: (
					<ProtectedRoute authorized={['PRODI', 'FAKULTAS']}>
						<ChangePassword />
					</ProtectedRoute>
				),
			},
		],
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '*',
		element: <NotFound />,
	},
]);
