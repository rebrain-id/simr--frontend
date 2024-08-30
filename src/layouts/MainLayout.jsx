import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
	return (
		<main className="min-h-screen w-full flex gap-4 p-2 bg-light-gray">
			<Sidebar />
			<Outlet />
		</main>
	);
};

export default MainLayout;
