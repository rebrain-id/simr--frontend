import { useEffect, useState } from 'react';
import ModalAddAnggota from '../../components/ModalAddAnggota';
import Button from '../../elements/Button';
import FormInput from '../../elements/forms/FormInput';
import FormSelect from '../../elements/forms/FormSelect';
import FormTextarea from '../../elements/forms/FormTextarea';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTypeAgenda } from '../../redux/actions/typeAgendaAction';
import { createAgenda } from '../../redux/actions/agendaAction';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Alert from '../../elements/Alert';

const AddAgenda = () => {
	const username = 'informatika';
	const navigation = useNavigate();
	const dispatch = useDispatch();
	const typeAgenda = useSelector((state) => state.typeAgenda.typeAgenda);

	useEffect(() => {
		dispatch(fetchTypeAgenda());
	}, [dispatch]);

	const [openModal, setOpenModal] = useState(false);
	const [inputValue, setInputValue] = useState({
		title: '',
		from: '',
		to: '',
		location: '',
		typeAgenda: '',
		description: '',
	});

	const handleInputValue = (e) => {
		setInputValue({
			...inputValue,
			[e.target.name]: e.target.value,
		});
	};

	const handleOpenModal = () => {
		setOpenModal(!openModal);
	};

	useEffect(() => {
		if (openModal) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	});

	const [showAlert, setShowAlert] = useState({
		status: '',
		message: '',
		visible: false,
	});

	const handleSubmitData = async () => {
		try {
			const departmentFromStorage = JSON.parse(
				sessionStorage.getItem('member'),
			);

			if (
				inputValue.title &&
				inputValue.description &&
				inputValue.from &&
				inputValue.to &&
				inputValue.typeAgenda &&
				departmentFromStorage
			) {
				const data = {
					title: inputValue.title,
					description: inputValue.description,
					start: moment(inputValue.from).format(
						'YYYY-MM-DD HH:mm:ss',
					),
					finish: moment(inputValue.to).format('YYYY-MM-DD HH:mm:ss'),
					typeAgendaUuid: inputValue.typeAgenda,
					location: inputValue.location,
					departmentsUuid: departmentFromStorage,
					username: username,
				};

				const response = await dispatch(createAgenda({ data: data }));

				if (response && response.payload.statusCode === 201) {
					sessionStorage.removeItem('member');

					navigation('/agenda?menu=calendar');
				}
			}

			setShowAlert({
				status: 'error',
				message:
					'Harap isi semua kolom terlebih dahulu sebelum menyimpan data',
				visible: true,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleClose = () => {
		setShowAlert({
			status: '',
			message: '',
			visible: false,
		});
	};

	return (
		<>
			{showAlert.visible && (
				<Alert
					status={showAlert.status}
					message={showAlert.message}
					onClick={handleClose}
				/>
			)}

			{openModal && (
				<ModalAddAnggota
					onClick={handleOpenModal}
					dateFrom={inputValue.from}
					dateTo={inputValue.to}
				/>
			)}
			<div
				className={`bg-white px-10 py-5 rounded drop-shadow-bottom mt-5`}
			>
				<h1 className="text-lg font-semibold mb-5">Tambah Agenda</h1>

				<section className="flex flex-col gap-3 mt-5 w-full">
					<FormInput
						variant="w-full"
						inputvariant="text-sm font-normal"
						labelvariant="text-xs"
						label="Agenda"
						name="title"
						onChange={handleInputValue}
					/>
					<div className="flex gap-5">
						<FormInput
							variant="w-full"
							inputvariant="text-sm font-normal"
							labelvariant="text-xs"
							label="Dari"
							type="datetime-local"
							name="from"
							onChange={handleInputValue}
							placeholder="Dari"
						/>
						<FormInput
							variant="w-full"
							inputvariant="text-sm font-normal"
							labelvariant="text-xs"
							label="Sampai"
							type="datetime-local"
							name="to"
							onChange={handleInputValue}
						/>
					</div>
					<div className="flex gap-5 w-full">
						<div className="flex flex-col gap-3 w-1/2">
							<FormInput
								variant="w-full"
								inputvariant="text-sm font-normal"
								labelvariant="text-xs"
								label="Tempat"
								name="location"
								onChange={handleInputValue}
							/>
							<FormSelect
								label="Kategori"
								variant="w-full"
								name="typeAgenda"
								onChange={handleInputValue}
							>
								<option
									value=""
									className="text-light-secondary"
								>
									Pilih jenis agenda
								</option>
								{typeAgenda.map((item, index) => (
									<option
										value={item.uuid}
										className="text-secondary"
										key={index}
									>
										{item.name}
									</option>
								))}
							</FormSelect>
						</div>
						<FormTextarea
							label="Deskripsi"
							variant="w-1/2"
							rows={4}
							name="description"
							onChange={handleInputValue}
						/>
					</div>

					<div className="mt-5 flex items-center justify-between">
						<Button
							onClick={handleOpenModal}
							text="Tambah Anggota"
							variant="bg-light-primary bg-opacity-80 text-light-white text-sm hover:bg-opacity-100"
						/>
						<div className="flex items-center gap-2">
							<Button
								onClick={handleSubmitData}
								text="Simpan"
								variant={`bg-light-primary bg-opacity-90 text-light-white text-sm hover:bg-opacity-100`}
							/>
							<Button
								onClick={() => navigation(-1)}
								text="Batal"
								variant="bg-light-primary bg-opacity-30 text-light-primary text-sm hover:bg-opacity-50"
							/>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default AddAgenda;
