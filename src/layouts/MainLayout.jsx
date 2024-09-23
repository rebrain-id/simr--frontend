import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../elements/Footer';
import DetailAgendaSidebar from '../components/DetailAgendaSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { closeDetailAgenda } from '../redux/actions/agendaAction';
import LoadingScreen from '../elements/LoadingScreen';
import Alert from '../elements/Alert';

const MainLayout = () => {
	const [showLoading, setShowLoading] = useState(false);
	const [showSidebarDialogue, setShowSidebarDialogue] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const { detailAgenda, showSidebar, loading, message } = useSelector(
		(state) => state.agenda,
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(closeDetailAgenda());
	}, [dispatch]);

	useEffect(() => {
		if (showSidebar) {
			document.body.style.overflow = 'hidden';
			setShowSidebarDialogue(true);
		} else {
			document.body.style.overflow = '';
			setTimeout(() => {
				setShowSidebarDialogue(false);
			}, 1000);
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

	useEffect(() => {
		if (message.status) {
			setShowAlert(true);
		} else {
			setTimeout(() => {
				setShowAlert(false);
			}, 5000);
		}
	}, [message]);

	const handleCloseAlert = () => {
		setShowAlert(false);
	};

	return (
		<main className="min-h-screen h-auto w-full flex p-2 bg-light-gray">
			{showAlert && (
				<Alert
					status={message.status}
					message={message.message}
					onClick={handleCloseAlert}
				/>
			)}

			<Sidebar />

			<aside className="w-full px-10">
				{showSidebarDialogue && (
					<DetailAgendaSidebar
						onClick={() => dispatch(closeDetailAgenda())}
						data={detailAgenda}
						isShow={true}
						variant={
							showSidebar ? 'translate-x-0' : 'translate-x-full'
						}
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
