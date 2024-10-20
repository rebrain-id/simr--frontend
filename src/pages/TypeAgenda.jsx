import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../elements/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchTypeAgenda } from '../redux/actions/typeAgendaAction';
import ListTypeAgenda from '../components/ListTypeAgenda';
import { resetUpdatedStatus } from '../redux/slices/typeAgendaSlice';
import ModalAddTypeAgenda from '../components/ModalAddTypeAgenda';
import Alert from '../elements/Alert';

const TypeAgenda = () => {
	const dispatch = useDispatch();
	const { typeAgenda, isUpdated, loading, message } = useSelector(
		(state) => state.typeAgenda,
	);
	const [showModal, setShowModal] = useState(false);
	const [alert, setAlert] = useState(false);

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
		if (message && message.status) {
			setAlert(true);
		}
	}, [message]);

	return (
		<>
			{showModal && <ModalAddTypeAgenda onClick={handleModal} />}

			{alert && (
				<Alert
					status={message.status}
					message={message.message}
					onClick={() => setAlert(false)}
				/>
			)}

			<div className="bg-white px-10 py-5 rounded drop-shadow-bottom mt-5">
				<div className="flex items-center justify-between">
					<h1 className="text-base font-semibold">Jenis Agenda</h1>

					<div
						className="flex items-center bg-light-primary text-white rounded text-sm"
						onClick={handleModal}
					>
						<FontAwesomeIcon
							icon={faPlus}
							className="text-white border-0 outline-none pl-2"
						/>
						<Button text="Tambah Dosen" />
					</div>
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
