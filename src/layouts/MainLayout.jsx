import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
// import Footer from '../elements/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { lazy, Suspense, useEffect, useState } from 'react';
import { closeDetailAgenda } from '../redux/actions/agendaAction';
import Alert from '../elements/Alert';
import Device from '../pages/errors/Device';
import { closeMessage } from '../redux/actions/messageAction';
import ModalDanger from '../elements/modal/ModalDanger';
import { postLogout } from '../redux/actions/authAction';
const DetailAgendaSidebar = lazy(
	() => import('../components/DetailAgendaSidebar'),
);

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
	const navigate = useNavigate();

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
		} else if (
			message &&
			message.status === 'session' &&
			isOpen &&
			message.page === '*'
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

	const handleLogout = async () => {
		try {
			const response = await dispatch(postLogout());

			if (response && response.statusCode == 200) {
				navigate('/login');
			} else {
				navigate('/login');
			}
		} catch (error) {
			console.log(error);
		}
	};

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

					{showAlertAgenda && message?.status === 'session' && (
						<ModalDanger
							status={message.status}
							message={message.message}
							onClick={handleLogout}
							text="Logout"
						/>
					)}

					<Sidebar />

					<aside className="w-full px-10 pb-20">
						<Suspense>
							{showSidebarDialogue && (
								<DetailAgendaSidebar
									onClick={() =>
										dispatch(closeDetailAgenda())
									}
									data={detailAgenda}
									isShow={true}
									variant={
										showSidebar
											? 'translate-x-0'
											: 'translate-x-full'
									}
								/>
							)}
						</Suspense>
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
