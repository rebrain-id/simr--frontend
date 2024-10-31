import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../elements/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
	closeMessage,
	closeModal,
	deleteUser,
	fetchUser,
} from '../redux/actions/authAction';
import ListUser from '../components/ListUser';
import { fetchDepartmentsOptions } from '../redux/actions/departmentAction';
import ModalAddUser from '../components/ModalAddUser';
import Alert from '../elements/Alert';
import ModalDanger from '../elements/modal/ModalDanger';
import ModalWarning from '../elements/modal/ModalWarning';

const User = () => {
	const dispatch = useDispatch();
	const users = useSelector((state) => state.auth.auth);
	const { loading, message, isUpdated, isOpenModal, username } = useSelector(
		(state) => state.auth,
	);
	const departments = useSelector(
		(state) => state.fetchDepartments.department,
	);

	const [openModal, setOpenModal] = useState(false);
	const [openAlert, setOpenAlert] = useState(false);

	useEffect(() => {
		dispatch(fetchUser());
		dispatch(fetchDepartmentsOptions());
	}, [dispatch, isUpdated]);

	const handleOpenModal = () => {
		setOpenModal(!openModal);
	};

	useEffect(() => {
		if (message && message?.status === 'success') {
			setOpenAlert(true);
			setTimeout(() => {
				dispatch(closeMessage());
				setOpenAlert(false);
			}, 5000);
		} else if (message && message?.status === 'error') {
			setOpenAlert(true);
		}
	}, [message, dispatch]);

	return (
		<>
			{openModal && (
				<ModalAddUser
					department={departments}
					onClick={handleOpenModal}
				/>
			)}

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
					message="Apakah anda yakin ingin menghapus akun ini?"
					onClose={() => dispatch(closeModal())}
					onClick={() => dispatch(deleteUser(username))}
				/>
			)}

			<main className="bg-white px-10 pb-10 rounded drop-shadow-bottom mt-5">
				<div className="flex items-center justify-between pt-4">
					<h1 className="text-base font-semibold">Pengguna</h1>
					<Button
						icon={faPlus}
						text="Tambah Data"
						variant="flex items-center bg-light-primary text-white rounded text-sm"
						onClick={handleOpenModal}
					/>
				</div>

				<main className="mt-5 flex flex-col gap-3">
					{loading ? (
						<p className="text-center text-xs text-light-secondary">
							sedang memuat data pengguna
						</p>
					) : users ? (
						users.map((item) => (
							<ListUser
								data={item}
								key={item.department}
								department={departments}
							/>
						))
					) : (
						<p className="text-center text-xs text-light-secondary">
							tidak ada data pengguna
						</p>
					)}
				</main>
			</main>
		</>
	);
};

export default User;
