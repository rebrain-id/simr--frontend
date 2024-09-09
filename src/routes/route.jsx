import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard';
import Agenda from '../pages/agendas/Agenda';
import ProgramStudiPage from '../pages/ProgramStudiPage';
import DosenPage from '../pages/DosenPage';
import AgendaByDate from '../pages/agendas/AgendaByDate';
import AddAgenda from '../pages/agendas/AddAgenda';

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
				path: 'prodi',
				element: <ProgramStudiPage />,
			},
			{
				path: 'dosen',
				element: <DosenPage />,
			},
		],
	},
]);
