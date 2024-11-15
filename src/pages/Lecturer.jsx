import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../elements/Button';
import CreateModal from '../components/CreateLecturerModal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteLecturerData,
	fetchCloseModal,
	fetchLecturers,
} from '../redux/actions/lecturerAction';
import ListLecturer from '../elements/ListLecturer';
import { fetchDepartments } from '../redux/actions/departmentAction';
import { jwtDecode } from 'jwt-decode';
import Alert from '../elements/Alert';
import ModalDanger from '../elements/modal/ModalDanger';
import ModalWarning from '../elements/modal/ModalWarning';
import { closeMessage } from '../redux/actions/messageAction';
import { Helmet } from 'react-helmet';

const Lecturer = () => {
	const [openModal, setOpenModal] = useState(false);
	const [openAlert, setOpenAlert] = useState(false);
	const handleModal = () => setOpenModal(!openModal);

	const dispatch = useDispatch();

	const { isUpdated, loading, uuid, isOpenModal } = useSelector(
		(state) => state.fetchLecturers,
	);
	const lecturers = useSelector((state) => state.fetchLecturers.lecturer);
	const { message, isOpen } = useSelector((state) => state.message);

	const access_token = sessionStorage.getItem('access_token');
	const role = access_token && jwtDecode(access_token).role;

	useEffect(() => {
		dispatch(fetchLecturers());
		dispatch(fetchDepartments());
	}, [dispatch, isUpdated]);

	useEffect(() => {
		if (
			message &&
			message?.status === 'success' &&
			isOpen &&
			(message.page === 'lecturer' || message.page === '*')
		) {
			setOpenAlert(true);
			setTimeout(() => {
				dispatch(closeMessage());
				setOpenAlert(false);
			}, 5000);
		} else if (
			message &&
			message?.status === 'error' &&
			isOpen &&
			(message.page === 'lecturer' || message.page === '*')
		) {
			setOpenAlert(true);
		}
	}, [message, isOpen, dispatch]);

	const handleDeleteLecturer = async () => {
		const response = await dispatch(deleteLecturerData(uuid));
		if (response && response.statusCode === 200) {
			dispatch(fetchCloseModal());
			dispatch(fetchLecturers());
		} else {
			dispatch(fetchCloseModal());
		}
	};

	return (
		<>
			<Helmet>
				<title>Dosen</title>
			</Helmet>

			{openAlert && message?.status === 'success' && (
				<Alert
					status={message?.status}
					message={message.message}
					onClick={() => dispatch(closeMessage())}
				/>
			)}

			{openAlert && message?.status === 'error' && (
				<ModalDanger
					message={message.message}
					onClick={() => dispatch(closeMessage())}
				/>
			)}

			{isOpenModal && (
				<ModalWarning
					message="Apakah anda yakin ingin menghapus data ini?"
					onClose={() => {
						dispatch(fetchCloseModal());
						dispatch(fetchLecturers());
					}}
					onClick={handleDeleteLecturer}
				/>
			)}
			<main className="bg-white px-10 pt-4 mt-5 pb-10 rounded drop-shadow-bottom">
				<div className="flex items-center justify-between">
					<h1 className="text-base font-semibold">Dosen</h1>
					<Button
						icon={faPlus}
						text="Tambah Data"
						variant="flex items-center bg-light-primary text-white rounded text-sm"
						onClick={handleModal}
					/>
				</div>

				<section className="mt-5 flex flex-col gap-3">
					{loading ? (
						<p className="text-center text-xs text-light-secondary">
							sedang memuat data dosen
						</p>
					) : lecturers?.length === 0 ? (
						<p className="text-center text-xs text-light-secondary">
							Tidak ada data dosen
						</p>
					) : lecturers ? (
						lecturers.map((item) => (
							<ListLecturer
								key={item.uuid}
								dep={item.department}
								role={role}
								lecturer={item.lecturer}
							/>
						))
					) : null}
				</section>
			</main>
			{openModal && (
				<CreateModal close={() => setOpenModal(false)} role={role} />
			)}
		</>
	);
};

export default Lecturer;
