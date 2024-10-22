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

const DetailAgendaSidebar = (props) => {
	const { onClick, data, isShow = false, variant } = props;

	const access_token = sessionStorage.getItem('access_token') || null;
	const username = jwtDecode(access_token).username;

	const [showModal, setShowModal] = useState(false);
	const [showModalWarning, setShowModalWarning] = useState(false);
	const [showModalDanger, setShowModalDanger] = useState(false);
	const [member, setMember] = useState([]);

	const dispatch = useDispatch();
	const typeAgenda = useSelector((state) => state.typeAgenda.typeAgenda);
	const department = useSelector(
		(state) => state.fetchDepartments.department,
	);

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
		start: data ? data.start : '',
		finish: data ? data.finish : '',
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

	const handleSubmit = async () => {
		try {
			const response = await dispatch(
				updateDetailAgenda({ data: inputValue }),
			);

			console.log(response);

			if (response && response.payload.statusCode === 200) {
				dispatch(closeDetailAgenda());
				sessionStorage.removeItem('member');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async () => {
		try {
			setShowModalWarning(false);
			const response = await dispatch(
				deleteDetailAgenda({ uuid: inputValue.uuid }),
			);

			if (response && response.payload.data.statusCode === 200) {
				dispatch(closeDetailAgenda());
				sessionStorage.removeItem('member');
			} else {
				setShowModalDanger(true);
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

	const handleOpenDangerModal = () => {
		setShowModalDanger(!showModalDanger);
	};

	console.log(data);

	return (
		<>
			{showModal && (
				<ModalAddAnggota
					departments={department}
					dateFrom={inputValue.start}
					dateTo={inputValue.finish}
					selectedMember={(data?.departments || []).map(
						(item) => item.uuid,
					)}
					onClick={handleOpenModal}
					type="update"
					uuid={data?.uuid}
				/>
			)}

			{showModalWarning && (
				<ModalWarning
					onClick={handleDelete}
					onClose={handleOpenWarningModal}
					message="Apakah anda yakin ingin menghapus agenda ini?"
				/>
			)}

			{showModalDanger && (
				<ModalDanger
					onClick={handleOpenDangerModal}
					message="Kesalahan dalam menghapus agenda, periksa kembali data anda"
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

					<section className="flex flex-col px-8 gap-3 mt-5">
						<FormInput
							variant="w-full flex flex-col gap-1"
							inputvariant="text-sm font-normal w-full"
							labelvariant="text-xs"
							label="Agenda"
							value={inputValue.title}
							name="title"
							onChange={handleInputValue}
						/>
						<FormInput
							variant="w-full flex flex-col gap-1"
							inputvariant="text-sm font-normal w-full"
							labelvariant="text-xs"
							label="Dari"
							type="datetime-local"
							value={moment
								.utc(inputValue.start)
								.format('YYYY-MM-DDTHH:mm')}
							name="start"
							onChange={handleInputValue}
						/>
						<FormInput
							variant="w-full flex flex-col gap-1"
							inputvariant="text-sm font-normal w-full"
							labelvariant="text-xs"
							label="Sampai"
							type="datetime-local"
							value={moment
								.utc(inputValue.finish)
								.format('YYYY-MM-DDTHH:mm')}
							name="finish"
							onChange={handleInputValue}
						/>
						<FormInput
							variant="w-full flex flex-col gap-1"
							inputvariant="text-sm font-normal w-full"
							labelvariant="text-xs"
							label="Tempat"
							value={inputValue.location}
							name="location"
							onChange={handleInputValue}
						/>
						<FormTextarea
							label="Deskripsi"
							value={inputValue.description}
							name="description"
							onChange={handleInputValue}
						/>
						<FormSelect
							label="Kategori"
							value={inputValue.typeAgenda}
							name="typeAgenda"
							onChange={handleInputValue}
							labelVariant="text-xs"
							selectVariant="text-sm"
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

							{username === data?.username && (
								<div className="mt-1 flex justify-end">
									<Button
										text="Update Anggota"
										variant={`${data && data.isDone ? 'bg-light-secondary cursor-not-allowed bg-opacity-30 hover:bg-opacity-30' : 'bg-light-primary bg-opacity-90'} text-light-white text-sm hover:bg-opacity-100`}
										onClick={handleOpenModal}
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
								>
									<FontAwesomeIcon
										icon={faLink}
										className="mr-2"
									/>
									Link Notulensi Agenda
								</a>
							</div>
						) : (
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
						)}

						{data?.absent ? (
							<div className="w-80">
								<h1 className="text-xs font-medium">Absensi</h1>
								<img
									src={`${API_URL()}/${data.absent}`}
									alt=""
									className="mt-1"
								/>
							</div>
						) : (
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
						)}

						<Toggel
							name={'isDone'}
							label="Agenda Selesai"
							onChange={!data?.isDone && handleInputValue}
							isChecked={inputValue.isDone}
						/>
					</section>

					<section className="mt-5 flex items-center justify-between px-8">
						<div className="flex items-center gap-2">
							{username === data?.author && (
								<Button
									text="Update"
									variant={`${data && data.isDone ? 'bg-light-secondary cursor-not-allowed bg-opacity-30 hover:bg-opacity-30' : 'bg-light-primary bg-opacity-90'} text-light-white text-sm hover:bg-opacity-100`}
									onClick={
										data && data.isDone !== true
											? handleSubmit
											: () => {}
									}
								/>
							)}
							<Button
								onClick={handleCloseModal}
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
