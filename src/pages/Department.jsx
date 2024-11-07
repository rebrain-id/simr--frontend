import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../elements/Button';
import ListDepartment from '../elements/ListDepartment';
import CreateModal from '../components/CreateDepartmentModal';
import { useEffect, useState } from 'react';
import {
	deleteDepartmentData,
	fetchDepartments,
	fetchDepartmentsCloseModal,
} from '../redux/actions/departmentAction';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../elements/Alert';
import ModalWarning from '../elements/modal/ModalWarning';
import ModalDanger from '../elements/modal/ModalDanger';
import { closeMessage } from '../redux/actions/messageAction';
import { Helmet } from 'react-helmet';

const Department = () => {
	const [openModal, setOpenModal] = useState(false);
	const [openAlert, setOpenAlert] = useState(false);

	const handleModal = () => setOpenModal(!openModal);

	const dispatch = useDispatch();
	const departments = useSelector(
		(state) => state.fetchDepartments.department,
	);
	const { isUpdated, loading, isOpenModal, uuid } = useSelector(
		(state) => state.fetchDepartments,
	);

	const { message, isOpen } = useSelector((state) => state.message);

	useEffect(() => {
		dispatch(fetchDepartments());
	}, [dispatch, isUpdated]);

	useEffect(() => {
		if (
			message &&
			message.status === 'success' &&
			isOpen &&
			(message.page === 'department' || message.page === '*')
		) {
			setOpenAlert(true);
			setTimeout(() => {
				dispatch(closeMessage());
				setOpenAlert(false);
			}, 5000);
		} else if (
			message &&
			message.status === 'error' &&
			isOpen &&
			(message.page === 'department' || message.page === '*')
		) {
			setOpenAlert(true);
		}
	}, [message, dispatch, isOpen]);

	const handleDeleteDepartment = async () => {
		const response = await dispatch(deleteDepartmentData(uuid));
		if (response && response.statusCode === 200) {
			close();
			dispatch(fetchDepartmentsCloseModal());
			dispatch(fetchDepartments());
		}
	};

	return (
		<>
			<Helmet>
				<title>Program Studi</title>
			</Helmet>

			{openAlert && message?.status === 'success' && (
				<Alert
					status={message.status}
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
					message="
				Apakah anda yakin ingin menghapus program studi ini?"
					onClick={handleDeleteDepartment}
					onClose={() => dispatch(fetchDepartmentsCloseModal())}
				/>
			)}

			<main className="bg-white px-10 pb-10 rounded drop-shadow-bottom mt-5">
				<div className="flex items-center justify-between pt-4">
					<h1 className="text-base font-semibold">Program Studi</h1>
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
							sedang memuat data program studi
						</p>
					) : departments ? (
						departments.map((item, index) => (
							<ListDepartment
								key={index}
								data={item.name}
								uuid={item.uuid}
								name={item.name}
							/>
						))
					) : (
						<p className="text-center text-xs text-light-secondary">
							Tidak ada data program studi
						</p>
					)}
				</section>
			</main>
			{openModal && <CreateModal close={() => setOpenModal(false)} />}
		</>
	);
};

export default Department;
