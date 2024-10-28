import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
// import Footer from '../elements/Footer';
import DetailAgendaSidebar from '../components/DetailAgendaSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { closeDetailAgenda } from '../redux/actions/agendaAction';
import Alert from '../elements/Alert';
import Device from '../pages/errors/Device';

const MainLayout = () => {
	const [showSidebarDialogue, setShowSidebarDialogue] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const { detailAgenda, showSidebar, message } = useSelector(
		(state) => state.agenda,
	);
	const [deviceWidth, setDevideWidth] = useState(true);

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
		if (message.status) {
			setShowAlert(true);
			setTimeout(() => {
				setShowAlert(false);
			}, 5000);
		} else {
			setTimeout(() => {
				setShowAlert(false);
			}, 5000);
		}
	}, [message]);

	useEffect(() => {
		if (window.innerWidth < 768) {
			setDevideWidth(false);
		}
	}, []);

	const handleCloseAlert = () => {
		setShowAlert(false);
	};

	return (
		<>
			{!deviceWidth ? (
				<Device />
			) : (
				<main className="min-h-screen h-auto w-full flex p-2 bg-light-gray">
					{showAlert && (
						<Alert
							status={message.status}
							message={message.message}
							onClick={handleCloseAlert}
						/>
					)}

					<Sidebar />

					<aside className="w-full px-10 pb-20">
						{showSidebarDialogue && (
							<DetailAgendaSidebar
								onClick={() => dispatch(closeDetailAgenda())}
								data={detailAgenda}
								isShow={true}
								variant={
									showSidebar
										? 'translate-x-0'
										: 'translate-x-full'
								}
							/>
						)}
						<Header />
						<Outlet />
						{/* <Footer /> */}
					</aside>
				</main>
			)}
		</>
	);
};

export default MainLayout;
