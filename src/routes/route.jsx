import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Agenda from '../pages/agendas/Agenda';
import Department from '../pages/Department';
import Lecturer from '../pages/Lecturer';
import AgendaByDate from '../pages/agendas/AgendaByDate';
import AddAgenda from '../pages/agendas/AddAgenda';
import PdfViewer from '../pages/PdfViewer';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				index: true,
				element: <Dashboard />,
			},
			{
				path: 'agenda',
				element: <Agenda />,
			},
			{
				path: 'agenda/date',
				element: <AgendaByDate />,
			},
			{
				path: 'agenda/new',
				element: <AddAgenda />,
			},
			{
				path: 'agenda/date',
				element: <AgendaByDate />,
			},
			{
				path: 'agenda/new',
				element: <AddAgenda />,
			},
			{
				path: 'prodi',
				element: <Department />,
			},
			{
				path: 'dosen',
				element: <Lecturer />,
			},
			{
				path: 'pdf',
				element: <PdfViewer />,
			},
		],
	},
	{
		path: '/login',
		element: <Login />,
	},
]);
