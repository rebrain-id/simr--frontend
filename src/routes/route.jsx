import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard';
import ProgramStudiPage from '../pages/ProgramStudiPage';
import DosenPage from '../pages/DosenPage';

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
