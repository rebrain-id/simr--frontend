import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormInput from '../elements/forms/FormInput';
import { faLink, faXmark } from '@fortawesome/free-solid-svg-icons';
import FormTextarea from '../elements/forms/FormTextarea';
import FormSelect from '../elements/forms/FormSelect';
import Button from '../elements/Button';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTypeAgenda } from '../redux/actions/typeAgendaAction';
import {
	closeDetailAgenda,
	deleteDetailAgenda,
	updateDetailAgenda,
} from '../redux/actions/agendaAction';
import { fetchDepartmentsOptions } from '../redux/actions/departmentAction';
import Toggel from '../elements/forms/Toggel';
import { API_URL } from '../services/config';
import ModalAddAnggota from './ModalAddAnggota';
import ModalWarning from '../elements/modal/ModalWarning';
import ModalDanger from '../elements/modal/ModalDanger';
import { jwtDecode } from 'jwt-decode';
import { closeMessage } from '../redux/actions/messageAction';
import Alert from '../elements/Alert';

const DetailAgendaSidebar = (props) => {
	const { onClick, data, isShow = false, variant } = props;

	const access_token = sessionStorage.getItem('access_token') || null;
	const username = jwtDecode(access_token).username;

	const [showModal, setShowModal] = useState(false);
	const [showModalWarning, setShowModalWarning] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [member, setMember] = useState([]);

	const dispatch = useDispatch();
	const typeAgenda = useSelector((state) => state.typeAgenda.typeAgenda);
	const department = useSelector(
		(state) => state.fetchDepartments.department,
	);

	const [submited, setSubmited] = useState(false);

	const { message, isOpen } = useSelector((state) => state.message);

	useEffect(() => {
		dispatch(fetchTypeAgenda());
		dispatch(fetchDepartmentsOptions());
	}, [dispatch]);

	useEffect(() => {
		const storedMember = JSON.parse(sessionStorage.getItem('member'));
		if (storedMember) {
			setMember(storedMember);
		}
	}, []);

	const handleCloseModal = (e) => {
		if (e.target === e.currentTarget) {
			onClick();
			sessionStorage.removeItem('member');
		}
	};

	const [inputValue, setInputValue] = useState({
		uuid: data ? data.uuid : '',
		title: data ? data.title : '',
		date: data ? data.start.split('T')[0] : '',
		start: data ? data.start.split('T')[1].split(':00.')[0] : '',
		finish: data ? data.finish.split('T')[1].split(':00.')[0] : '',
		typeAgenda: data ? data.typeAgenda.uuid : '',
		description: data ? data.description : '',
		location: data ? data.location : '',
		attendees: data ? data.absent : '',
		notulens: data ? data.notulen : '',
		isDone: data ? data.isDone : false,
		department: member,
	});

	const handleInputValue = (e) => {
		const { name, type, value, checked, files } = e.target;
		if (type === 'file') {
			setInputValue((prev) => ({
				...prev,
				[name]: files[0],
			}));
		} else {
			setInputValue((prev) => ({
				...prev,
				[name]: type === 'checkbox' ? checked : value,
			}));
		}
	};

	console.log(data);

	const handleSubmit = async () => {
		const requestData = {
			uuid: inputValue.uuid,
			title: inputValue.title,
			start: `${inputValue.date}T${inputValue.start}:00`,
			finish: `${inputValue.date}T${inputValue.finish}:00`,
			typeAgenda: inputValue.typeAgenda,
			description: inputValue.description,
			location: inputValue.location,
			absent: inputValue.attendees,
			notulen: inputValue.notulens,
			isDone: inputValue.isDone,
			department: member,
		};

		try {
			setSubmited(true);
			const response = await dispatch(
				updateDetailAgenda({ data: requestData }),
			);

			if (response && response.payload.statusCode === 200) {
				setSubmited(false);
				dispatch(closeDetailAgenda());
				sessionStorage.removeItem('member');
			}
		} catch (error) {
			setSubmited(false);
			console.log(error);
		}
	};

	const handleDelete = async () => {
		try {
			setShowModalWarning(false);
			const response = await dispatch(
				deleteDetailAgenda({ uuid: inputValue.uuid }),
			);

			if (response && response.payload.statusCode === 200) {
				dispatch(closeDetailAgenda());
				sessionStorage.removeItem('member');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleOpenModal = () => {
		setShowModal(!showModal);
	};

	const handleOpenWarningModal = () => {
		setShowModalWarning(!showModalWarning);
	};

	useEffect(() => {
		if (
			message &&
			message.status === 'success' &&
			isOpen &&
			(message.page === 'agenda' || message.page === '*')
		) {
			setShowAlert(true);
			setTimeout(() => {
				dispatch(closeMessage());
				setShowAlert(false);
			}, 5000);
		} else if (
			message &&
			message.status === 'error' &&
			isOpen &&
			(message.page === 'agenda' || message.page === '*')
		) {
			setShowAlert(true);
		}
	}, [message, dispatch, isOpen]);

	return (
		<>
			{showModal && (
				<ModalAddAnggota
					departments={department}
					dateFrom={`${inputValue.date}T${inputValue.start}:00`}
					dateTo={`${inputValue.date}T${inputValue.finish}:00`}
					selectedMember={(data?.departments || []).map(
						(item) => item.uuid,
					)}
					onClick={handleOpenModal}
					type="update"
					uuid={data?.uuid}
				/>
			)}

			{showAlert && message?.status === 'success' && (
				<Alert
					onClick={() => dispatch(closeMessage())}
					status={message?.status}
					message={message?.message}
				/>
			)}

			{showAlert && message?.status === 'error' && (
				<ModalDanger
					onClick={() => dispatch(closeMessage())}
					message={message?.message}
				/>
			)}

			{showModalWarning && (
				<ModalWarning
					onClick={handleDelete}
					onClose={handleOpenWarningModal}
					message="Apakah anda yakin ingin menghapus agenda ini?"
				/>
			)}

			<div
				onClick={handleCloseModal}
				className={`fixed top-0 left-0 w-full min-h-screen h-auto bg-light-secondary bg-opacity-10 flex justify-end z-20 inset-y-0 transform transition-transform duration-1000 ${
					isShow ? 'translate-x-0' : 'translate-x-full'
				}`}
			>
				<div
					className={`h-screen overflow-y-auto bg-light-white pb-5 drop-shadow-right transition-all duration-1000 ${variant}`}
				>
					<section className="sticky top-0 py-5 px-8 bg-light-white flex justify-between items-center border-b">
						<h1 className="text-lg font-semibold">Detail Agenda</h1>
						<FontAwesomeIcon
							icon={faXmark}
							className="cursor-pointer"
							onClick={onClick}
						/>
					</section>

					<form className="flex flex-col px-8 gap-3 mt-5">
						<FormInput
							variant="w-full flex flex-col gap-1"
							inputvariant="text-sm font-normal w-full"
							labelvariant="text-xs"
							label="Agenda"
							value={inputValue.title}
							name="title"
							onChange={handleInputValue}
							disabled={username !== data?.author ? true : false}
						/>
						<FormInput
							variant="w-full flex flex-col gap-1"
							inputvariant="text-sm font-normal w-full"
							labelvariant="text-xs"
							label="Tanggal"
							type="date"
							value={moment
								.utc(inputValue.date)
								.format('YYYY-MM-DD')}
							name="date"
							onChange={handleInputValue}
							disabled={username !== data?.author ? true : false}
						/>
						<div className="flex gap-5">
							<FormInput
								variant="w-full flex flex-col gap-1"
								inputvariant="text-sm font-normal w-full"
								labelvariant="text-xs"
								label="Dari"
								type="time"
								value={inputValue.start}
								note="format waktu 24 jam"
								name="start"
								onChange={handleInputValue}
								disabled={
									username !== data?.author ? true : false
								}
							/>
							<FormInput
								variant="w-full flex flex-col gap-1"
								inputvariant="text-sm font-normal w-full"
								labelvariant="text-xs"
								label="Sampai"
								type="time"
								value={inputValue.finish}
								note="format waktu 24 jam"
								name="finish"
								onChange={handleInputValue}
								disabled={
									username !== data?.author ? true : false
								}
							/>
						</div>
						<FormInput
							variant="w-full flex flex-col gap-1"
							inputvariant="text-sm font-normal w-full"
							labelvariant="text-xs"
							label="Tempat"
							value={inputValue.location}
							name="location"
							onChange={handleInputValue}
							disabled={username !== data?.author ? true : false}
						/>
						<FormTextarea
							label="Deskripsi"
							value={inputValue.description}
							name="description"
							onChange={handleInputValue}
							disabled={username !== data?.author ? true : false}
						/>
						<FormSelect
							label="Kategori"
							value={inputValue.typeAgenda}
							name="typeAgenda"
							onChange={handleInputValue}
							labelVariant="text-xs"
							selectVariant="text-sm"
							disabled={username !== data?.author ? true : false}
						>
							<option
								value=""
								className="text-light-secondary text-sm"
							>
								Pilih jenis agenda
							</option>
							{typeAgenda.map((item, index) => (
								<option
									value={item.uuid}
									className="text-secondary text-sm"
									key={index}
									selected={
										inputValue.typeAgenda === item.uuid
									}
								>
									{item.name}
								</option>
							))}
						</FormSelect>

						<div>
							<p className="text-xs font-medium">Anggota</p>

							<div className="grid grid-cols-2 gap-2 mt-2">
								{data?.departments &&
									data?.departments.map((dept, index) => (
										<p
											className="text-xs bg-light-gray p-2 rounded text-center"
											key={index}
										>
											{dept.name}
										</p>
									))}
							</div>

							{username === data?.author && (
								<div className="mt-1 flex justify-end">
									<Button
										type="button"
										text="Ubah Anggota"
										variant={`${data && data.isDone ? 'bg-light-secondary cursor-not-allowed bg-opacity-30 hover:bg-opacity-30' : 'bg-light-primary bg-opacity-90'} text-light-white text-sm hover:bg-opacity-100`}
										onClick={() =>
											data && data.isDone
												? handleOpenModal
												: ''
										}
									/>
								</div>
							)}
						</div>

						{data?.notulen ? (
							<div className="w-80">
								<h1 className="text-xs font-medium">
									Notulensi
								</h1>
								<a
									href={`${API_URL()}/${data.notulen}`}
									className="text-xs font-medium text-light-primary underline"
									target="_blank"
								>
									<FontAwesomeIcon
										icon={faLink}
										className="mr-2"
									/>
									Link Notulensi Agenda
								</a>
							</div>
						) : username !== data?.author && !data?.notulen ? (
							<div>
								<h1 className="text-xs font-medium">
									Notulensi
								</h1>
								<p className="text-xs text-center mt-2 text-light-secondary">
									Pembuat belum mengunggah notulensi
								</p>
							</div>
						) : !data?.notulen ? (
							<FormInput
								variant="w-full flex flex-col gap-1"
								inputvariant="text-sm font-normal w-full"
								labelvariant="text-xs"
								label="Notulensi"
								type="file"
								note="Pastikan file memiliki format .pdf, .doc, atau .docx"
								fileAccept=".pdf, .doc, .docx"
								name="notulens"
								onChange={handleInputValue}
							/>
						) : null}

						{data?.absent ? (
							<div className="w-80">
								<h1 className="text-xs font-medium">Absensi</h1>
								<img
									src={`${API_URL()}/${data.absent}`}
									alt=""
									className="mt-1"
								/>
							</div>
						) : username !== data?.author && !data?.absent ? (
							<div>
								<h1 className="text-xs font-medium">
									Notulensi
								</h1>
								<p className="text-xs text-center mt-2 text-light-secondary">
									Pembuat belum mengunggah absensi
								</p>
							</div>
						) : !data?.absent ? (
							<FormInput
								variant="w-full flex flex-col gap-1"
								inputvariant="text-sm font-normal w-full"
								labelvariant="text-xs"
								label="Absensi"
								type="file"
								note="Pastikan file memiliki format .jpg, .jpeg, atau .png"
								fileAccept=".jpg, .jpeg, .png"
								name="attendees"
								onChange={handleInputValue}
							/>
						) : null}

						{username === data?.author && (
							<Toggel
								name={'isDone'}
								label="Agenda Selesai"
								onChange={!data?.isDone && handleInputValue}
								isChecked={inputValue.isDone}
							/>
						)}
					</form>

					<section className="mt-5 flex items-center justify-between px-8">
						<div className="flex items-center gap-2">
							{username === data?.author && (
								<Button
									text="Perbarui"
									variant={`${(data && data.isDone) || submited ? 'bg-light-secondary cursor-not-allowed bg-opacity-30 hover:bg-opacity-30' : 'bg-light-primary bg-opacity-90'} text-light-white text-sm hover:bg-opacity-100`}
									onClick={
										data && data.isDone !== true
											? handleSubmit
											: () => {}
									}
								/>
							)}
							<Button
								onClick={onClick}
								text="Batal"
								variant="bg-light-primary bg-opacity-30 text-light-primary text-sm hover:bg-opacity-50"
							/>
						</div>

						{username === data?.author && (
							<Button
								text="Hapus"
								onClick={
									data && data.isDone !== true
										? handleOpenWarningModal
										: () => {}
								}
								variant={`${data && data.isDone ? 'bg-light-secondary cursor-not-allowed bg-opacity-30 hover:bg-opacity-30' : 'bg-light-danger bg-opacity-90'} text-light-white text-sm hover:bg-opacity-100`}
							/>
						)}
					</section>
				</div>
			</div>
		</>
	);
};

export default DetailAgendaSidebar;
