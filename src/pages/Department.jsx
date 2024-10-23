import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

const Department = () => {
	const [openModal, setOpenModal] = useState(false);
	const [openAlert, setOpenAlert] = useState(false);

	const handleModal = () => setOpenModal(!openModal);

	const dispatch = useDispatch();
	const departments = useSelector(
		(state) => state.fetchDepartments.department,
	);
	const { isUpdated, message, loading, isOpenModal, uuid } = useSelector(
		(state) => state.fetchDepartments,
	);

	useEffect(() => {
		dispatch(fetchDepartments());
	}, [dispatch, isUpdated]);

	useEffect(() => {
		if (message && message.status === 'success') {
			setOpenAlert(true);
			setTimeout(() => {
				setOpenAlert(false);
			}, 5000);
		} else if (message && message.status === 'error') {
			setOpenAlert(true);
		}
	}, [message]);

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
			{openAlert && message?.status === 'success' && (
				<Alert
					status={message.status}
					message={message.message}
					onClick={() => setOpenAlert(false)}
				/>
			)}

			{openAlert && message?.status === 'error' && (
				<ModalDanger
					message={message.message}
					onClick={() => setOpenAlert(false)}
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
					<div className="flex items-center bg-light-primary text-white rounded text-sm">
						<FontAwesomeIcon
							icon={faPlus}
							className="text-white border-0 outline-none pl-2"
						/>
						<Button
							text="Tambah Program Studi"
							onClick={handleModal}
						/>
					</div>
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
						<p className="text-center text-sm text-light-secondary">
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
