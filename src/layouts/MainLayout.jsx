import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../elements/Footer';

const MainLayout = () => {
	return (
		<main className="min-h-screen h-auto w-full flex p-2 bg-light-gray">
			<Sidebar />

			<aside className="w-full px-10">
				<Header />
				<Outlet />
				<Footer />
			</aside>
		</main>
	);
};

export default MainLayout;
