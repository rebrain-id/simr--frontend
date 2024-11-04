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
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { fetchDepartmentsOptions } from '../../redux/actions/departmentAction';
import { jwtDecode } from 'jwt-decode';
import ModalDanger from '../../elements/modal/ModalDanger';

const AddAgenda = () => {
	const access_token = sessionStorage.getItem('access_token');
	const decodeToken = jwtDecode(access_token);
	const username = decodeToken.username;
	const departmentUuid = decodeToken.department.uuid;

	if (!sessionStorage.getItem('member')) {
		sessionStorage.setItem('member', JSON.stringify([departmentUuid]));
	}

	const navigation = useNavigate();
	const dispatch = useDispatch();
	const typeAgenda = useSelector((state) => state.typeAgenda.typeAgenda);
	const departments = useSelector(
		(state) => state.fetchDepartments.department,
	);

	useEffect(() => {
		dispatch(fetchTypeAgenda());
		dispatch(fetchDepartmentsOptions());
	}, [dispatch]);

	const [openModal, setOpenModal] = useState(false);
	const [date, setDate] = useState({ from: '', to: '' });

	const handleChangeDate = (e) => {
		const { name, value } = e.target;
		setDate((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleOpenModal = (event, values) => {
		event.preventDefault();
		if (moment(values.from).isAfter(moment(values.to))) {
			setShowAlert({
				status: 'error',
				message: 'Terdapat kesalahan dalam memasukkan hari atau jam',
				visible: true,
			});
			setTimeout(() => {
				setShowAlert({ status: '', message: '', visible: false });
			}, 3000);
		} else {
			setOpenModal(!openModal);
		}
	};

	useEffect(() => {
		if (openModal) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}, [openModal]);

	const [showAlert, setShowAlert] = useState({
		status: '',
		message: '',
		visible: false,
	});

	const departmentFromStorage = JSON.parse(sessionStorage.getItem('member'));

	const handleSubmitData = async (values, { setSubmitting }) => {
		try {
			const uniqueDepartments = [...new Set(departmentFromStorage)];

			const startFrom = `${values.date}T${values.from}`;
			const finishTo = `${values.date}T${values.to}`;

			const data = {
				title: values.title,
				description: values.description,
				start: moment(startFrom).format('YYYY-MM-DD HH:mm:ss'),
				finish: moment(finishTo).format('YYYY-MM-DD HH:mm:ss'),
				typeAgendaUuid: values.typeAgenda,
				location: values.location,
				departmentsUuid: uniqueDepartments,
				username: username,
			};

			if (uniqueDepartments.length === 0) {
				setShowAlert({
					status: 'error',
					message: 'Pastikan anggota tidak kosong',
					visible: true,
				});
				setTimeout(() => {
					setShowAlert({ status: '', message: '', visible: false });
				}, 5000);
			} else {
				const response = await dispatch(createAgenda({ data }));

				if (response && response.payload.statusCode === 201) {
					sessionStorage.removeItem('member');
					navigation(
						`/agenda/date?date=${moment(values.date).format('DD')}&month=${moment(values.date).format('MM')}&year=${moment(values.date).format('YYYY')}`,
					);
				} else {
					setShowAlert({
						status: 'error',
						message: 'Gagal menyimpan data agenda',
						visible: true,
					});
				}
			}
		} catch (error) {
			setShowAlert({
				status: 'error',
				message: 'Terjadi kesalahan saat menyimpan data',
				visible: true,
			});
			console.error(error);
		}
		setSubmitting(false);
	};

	const validationSchema = Yup.object().shape({
		title: Yup.string().required('Judul agenda tidak boleh kosong'),
		date: Yup.string().required('Tanggal tidak boleh kosong'),
		from: Yup.string().required('Waktu mulai tidak boleh kosong'),
		// .test(
		// 	'from-before-to',
		// 	'Waktu mulai harus sebelum waktu selesai',
		// 	function (value) {
		// 		const { to } = this.parent;
		// 		return moment(value).isBefore(moment(to));
		// 	},
		// ),
		to: Yup.string().required('Waktu selesai tidak boleh kosong'),
		location: Yup.string().required('Tempat tidak boleh kosong'),
		typeAgenda: Yup.string().required('Jenis agenda tidak boleh kosong'),
	});

	const handleClose = () => {
		setShowAlert({ status: '', message: '', visible: false });
	};

	return (
		<>
			{showAlert.visible && (
				<ModalDanger
					message={showAlert.message}
					onClick={handleClose}
				/>
			)}

			{openModal && (
				<ModalAddAnggota
					onClick={() => setOpenModal(false)}
					departments={departments}
					dateFrom={`${date.date}T${date.from}`}
					dateTo={`${date.date}T${date.to}`}
					selectedMember={[departmentUuid]}
				/>
			)}

			<div className="bg-white px-10 py-5 rounded drop-shadow-bottom mt-5">
				<h1 className="text-lg font-semibold mb-5">Tambah Agenda</h1>

				<Formik
					initialValues={{
						title: '',
						date: '',
						from: '',
						to: '',
						location: '',
						typeAgenda: '',
						description: '',
					}}
					validationSchema={validationSchema}
					onSubmit={handleSubmitData}
				>
					{({ values, handleChange, handleSubmit, isSubmitting }) => (
						<Form
							onSubmit={handleSubmit}
							className="flex flex-col gap-3 mt-5 w-full"
						>
							<div>
								<FormInput
									variant="w-full flex flex-col gap-1"
									inputvariant="text-sm font-normal w-full"
									labelvariant="text-xs"
									label="Agenda"
									name="title"
									onChange={handleChange}
									value={values.title}
								/>
								<ErrorMessage
									name="title"
									component="div"
									className="text-xs text-danger font-light"
								/>
							</div>
							<div className="flex gap-5">
								<div className="w-1/2">
									<FormInput
										variant="w-full flex flex-col gap-1"
										inputvariant="text-sm font-normal w-full"
										labelvariant="text-xs"
										label="Tanggal"
										type="date"
										name="date"
										onChange={(e) => {
											handleChange(e);
											handleChangeDate(e);
										}}
										value={values.date}
									/>
									{/* <ErrorMessage
										name="from"
										component="div"
										className="text-xs text-danger font-light"
									/> */}
								</div>
								<div className="w-1/2 flex gap-5">
									<div className="w-1/2">
										<FormInput
											variant="w-full flex flex-col gap-1"
											inputvariant="text-sm font-normal w-full"
											labelvariant="text-xs"
											label="Mulai"
											type="time"
											name="from"
											onChange={(e) => {
												handleChange(e);
												handleChangeDate(e);
											}}
											value={values.from}
										/>
										<ErrorMessage
											name="from"
											component="div"
											className="text-xs text-danger font-light"
										/>
									</div>
									<div className="w-1/2">
										<FormInput
											variant="w-full flex flex-col gap-1"
											inputvariant="text-sm font-normal w-full"
											labelvariant="text-xs"
											label="Sampai"
											type="time"
											name="to"
											onChange={(e) => {
												handleChange(e);
												handleChangeDate(e);
											}}
											value={values.to}
										/>
										<ErrorMessage
											name="to"
											component="div"
											className="text-xs text-danger font-light"
										/>
									</div>
								</div>
							</div>
							<div className="flex gap-5 w-full">
								<div className="flex flex-col gap-3 w-1/2">
									<div>
										<FormInput
											variant="w-full flex flex-col gap-1"
											inputvariant="text-sm font-normal w-full"
											labelvariant="text-xs"
											label="Tempat"
											name="location"
											onChange={handleChange}
											value={values.location}
										/>
										<ErrorMessage
											name="location"
											component="div"
											className="text-xs text-danger font-light"
										/>
									</div>

									<div>
										<FormSelect
											label="Kategori"
											variant="w-full flex flex-col gap-1 text-sm"
											name="typeAgenda"
											labelVariant="text-xs"
											onChange={handleChange}
											value={values.typeAgenda}
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
										<ErrorMessage
											name="typeAgenda"
											component="div"
											className="text-xs text-danger font-light"
										/>
									</div>
								</div>
								<FormTextarea
									label="Deskripsi"
									variant="w-1/2"
									rows={4}
									name="description"
									onChange={handleChange}
									value={values.description}
								/>
							</div>

							<div className="mt-5 flex items-center justify-between">
								<Button
									onClick={(event) =>
										handleOpenModal(event, values)
									}
									type="button"
									text="Tambah Anggota"
									variant="bg-light-primary bg-opacity-80 text-light-white text-sm hover:bg-opacity-100"
								/>
								<div className="flex items-center gap-2">
									<Button
										type="submit"
										text="Simpan"
										variant="bg-light-primary bg-opacity-90 text-light-white text-sm hover:bg-opacity-100"
										isDisabled={isSubmitting}
									/>
									<Button
										type="button"
										onClick={() => navigation(-1)}
										text="Batal"
										variant="bg-light-primary bg-opacity-30 text-light-primary text-sm hover:bg-opacity-50"
									/>
								</div>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</>
	);
};

export default AddAgenda;
