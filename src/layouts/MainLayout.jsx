import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../elements/Footer';
import DetailAgendaSidebar from '../components/DetailAgendaSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { closeDetailAgenda } from '../redux/actions/agendaAction';

const MainLayout = () => {
	const { detailAgenda, showSidebar } = useSelector((state) => state.agenda);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(closeDetailAgenda());
	}, [dispatch]);

	useEffect(() => {
		if (showSidebar) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}, [showSidebar]);

	return (
		<main className="min-h-screen h-auto w-full flex p-2 bg-light-gray">
			<Sidebar />

			<aside className="w-full px-10">
				{showSidebar && (
					<DetailAgendaSidebar
						onClick={() => dispatch(closeDetailAgenda())}
						data={detailAgenda}
						isShow={true}
					/>
				)}
				<Header />
				<Outlet />
				<Footer />
			</aside>
		</main>
	);
};

export default MainLayout;
