import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../elements/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
	deleteTypeAgenda,
	fetchTypeAgenda,
} from '../redux/actions/typeAgendaAction';
import ListTypeAgenda from '../components/ListTypeAgenda';
import {
	closeModalDelete,
	resetUpdatedStatus,
} from '../redux/slices/typeAgendaSlice';
import ModalAddTypeAgenda from '../components/ModalAddTypeAgenda';
import Alert from '../elements/Alert';
import ModalWarning from '../elements/modal/ModalWarning';
import { closeMessage } from '../redux/actions/messageAction';
import { Helmet } from 'react-helmet';

const TypeAgenda = () => {
	const dispatch = useDispatch();
	const { typeAgenda, isUpdated, loading, uuid } = useSelector(
		(state) => state.typeAgenda,
	);
	const openDelete = useSelector((state) => state.typeAgenda.isOpen);
	const [showModal, setShowModal] = useState(false);
	const [alert, setAlert] = useState(false);
	const { message, isOpen } = useSelector((state) => state.message);

	useEffect(() => {
		dispatch(fetchTypeAgenda());

		if (isUpdated) {
			dispatch(resetUpdatedStatus());
		}
	}, [isUpdated, dispatch]);

	const handleModal = () => {
		setShowModal(!showModal);
	};

	useEffect(() => {
		if (
			message &&
			message.status === 'success' &&
			isOpen &&
			(message.page === 'type-agenda' || message.page === '*')
		) {
			setAlert(true);
			setTimeout(() => {
				dispatch(closeMessage());
				setAlert(false);
			}, 5000);
		} else if (
			message &&
			message.status === 'error' &&
			isOpen &&
			(message.page === 'type-agenda' || message.page === '*')
		) {
			setAlert(true);
		}
	}, [message, dispatch, isOpen]);

	const handleCloseModalDelete = () => {
		dispatch(closeModalDelete());
	};

	const handleDelete = async () => {
		try {
			const response = await dispatch(deleteTypeAgenda({ uuid }));

			if (response && response.payload.statusCode === 200) {
				dispatch(closeModalDelete());
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Helmet>
				<title>Jenis Agenda</title>
			</Helmet>

			{showModal && <ModalAddTypeAgenda onClick={handleModal} />}

			{openDelete && (
				<ModalWarning
					message="Apakah anda yakin akan menghapus jenis agenda ini?"
					onClose={handleCloseModalDelete}
					onClick={handleDelete}
				/>
			)}

			{alert && (
				<Alert
					status={message.status}
					message={message.message}
					onClick={() => dispatch(closeMessage())}
				/>
			)}

			<div className="bg-white px-10 py-5 rounded drop-shadow-bottom mt-5">
				<div className="flex items-center justify-between">
					<h1 className="text-base font-semibold">Jenis Agenda</h1>

					<Button
						icon={faPlus}
						text="Tambah Data"
						variant="flex items-center bg-light-primary text-white rounded text-sm"
						onClick={handleModal}
					/>
				</div>

				<main className="mt-5">
					{loading ? (
						<p className="text-center text-xs text-light-secondary">
							sedang memuat data jenis agenda
						</p>
					) : typeAgenda ? (
						typeAgenda.map((item) => (
							<ListTypeAgenda key={item.uuid} data={item} />
						))
					) : (
						<p className="text-center text-xs text-light-secondary">
							data jenis agenda masih kosong
						</p>
					)}
				</main>
			</div>
		</>
	);
};

export default TypeAgenda;
