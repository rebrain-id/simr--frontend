import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard';
import Agenda from '../pages/Agenda';
import Department from '../pages/Department';
import Lecturer from '../pages/Lecturer';

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
				path: 'department',
				element: <Department />,
			},
			{
				path: 'lecturer',
				element: <Lecturer />,
			},
		],
	},
]);
