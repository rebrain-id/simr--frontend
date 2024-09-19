import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../elements/Footer';
import DetailAgendaSidebar from '../components/DetailAgendaSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { closeDetailAgenda } from '../redux/actions/agendaAction';
import LoadingScreen from '../elements/LoadingScreen';

const MainLayout = () => {
	const [showLoading, setShowLoading] = useState(false);
	const { detailAgenda, showSidebar, loading } = useSelector(
		(state) => state.agenda,
	);
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

	useEffect(() => {
		if (loading) {
			setShowLoading(true);
		} else {
			setTimeout(() => {
				setShowLoading(false);
			}, 5000);
		}
	}, [loading]);

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

			{showLoading && <LoadingScreen loading={loading} />}
		</main>
	);
};

export default MainLayout;
