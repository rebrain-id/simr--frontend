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
import { closeMessage } from '../redux/actions/messageAction';
import ModalDanger from '../elements/modal/ModalDanger';

const MainLayout = () => {
	const [showSidebarDialogue, setShowSidebarDialogue] = useState(false);
	// const [showAlert, setShowAlert] = useState(false);
	const [showAlertAgenda, setShowAlertAgenda] = useState(false);
	const { detailAgenda, showSidebar, isUpdated } = useSelector(
		(state) => state.agenda,
	);
	const { message, isOpen } = useSelector((state) => state.message);
	const [deviceWidth, setDevideWidth] = useState(true);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(closeDetailAgenda());
	}, [dispatch]);

	// useEffect(() => {
	// 	if (isUpdated) {
	// 		setTimeout(() => {
	// 			dispatch(changeStatus());
	// 		}, 500);
	// 	}
	// }, [dispatch, isUpdated]);

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
		if (
			message &&
			message.status === 'success' &&
			isOpen &&
			(message.page === 'agenda' || message.page === '*')
		) {
			setShowAlertAgenda(true);
			setTimeout(() => {
				dispatch(closeMessage());
				setShowAlertAgenda(false);
			}, 5000);
		} else if (
			message &&
			message.status === 'error' &&
			isOpen &&
			(message.page === 'agenda' || message.page === '*')
		) {
			setShowAlertAgenda(true);
		}
	}, [message, dispatch, isOpen]);

	useEffect(() => {
		if (window.innerWidth < 768) {
			setDevideWidth(false);
		}
	}, []);

	// const handleCloseAlert = () => {
	// 	setShowAlert(false);
	// };

	return (
		<>
			{!deviceWidth ? (
				<Device />
			) : (
				<main
					className="min-h-screen h-auto w-full flex bg-light-gray p-2"
					// style={{ backgroundImage: `url(${image2})` }}
				>
					{/* {showAlert && (
						<Alert
							status={message.status}
							message={message.message}
							onClick={handleCloseAlert}
						/>
					)} */}

					{showAlertAgenda && message?.status === 'success' && (
						<Alert
							status={message.status}
							message={message.message}
							onClick={() => dispatch(closeMessage())}
						/>
					)}

					{showAlertAgenda && message?.status === 'error' && (
						<ModalDanger
							status={message.status}
							message={message.message}
							onClick={() => dispatch(closeMessage())}
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
