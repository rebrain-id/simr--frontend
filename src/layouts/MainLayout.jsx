import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const MainLayout = () => {
	return (
		<main className="min-h-screen w-full flex gap-4 p-2 bg-light-gray">
			<Sidebar />

			<aside className="w-full">
				<Header />
				<Outlet />
			</aside>
		</main>
	);
};

export default MainLayout;
