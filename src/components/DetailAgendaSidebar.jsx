import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormInput from '../elements/forms/FormInput';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import FormTextarea from '../elements/forms/FormTextarea';
import FormSelect from '../elements/forms/FormSelect';
import FormCheckbox from '../elements/forms/FormCheckbox';
import FormInputCheckbox from '../elements/forms/FormInputCheckbox';
import Button from '../elements/Button';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTypeAgenda } from '../redux/actions/typeAgendaAction';
import { fetchDepartment } from '../redux/actions/departmentAction';
import { updateDetailAgenda } from '../redux/actions/agendaAction';
import { useNavigate } from 'react-router-dom';

const DetailAgendaSidebar = (props) => {
	const { onClick, data, isShow = false, variant } = props;
	const [checkAll, setCheckAll] = useState(false);
	const [checkboxStates, setCheckboxStates] = useState({});
	const navigation = useNavigate();

	const dispatch = useDispatch();
	const typeAgenda = useSelector((state) => state.typeAgenda.typeAgenda);
	const department = useSelector((state) => state.department.department);

	useEffect(() => {
		dispatch(fetchTypeAgenda());
		dispatch(fetchDepartment());
	}, [dispatch]);

	useEffect(() => {
		if (data && department.length) {
			const initialCheckboxStates = department.reduce((acc, dept) => {
				const isDepartmentSelected = data.departments.some(
					(selectedDept) => selectedDept.uuid === dept.uuid,
				);
				acc[dept.uuid] = isDepartmentSelected;
				return acc;
			}, {});

			setCheckboxStates(initialCheckboxStates);

			const selectedDepartments = Object.keys(
				initialCheckboxStates,
			).filter((key) => initialCheckboxStates[key]);

			setInputValue((prev) => ({
				...prev,
				department: selectedDepartments,
			}));

			const allChecked = Object.values(initialCheckboxStates).every(
				(value) => value,
			);
			setCheckAll(allChecked);
		}
	}, [data, department]);

	const handleCheckAll = () => {
		const newCheckAll = !checkAll;
		setCheckAll(newCheckAll);

		const updatedCheckboxStates = department.reduce((acc, dept) => {
			acc[dept.uuid] = newCheckAll;
			return acc;
		}, {});

		setCheckboxStates(updatedCheckboxStates);

		const selectedDepartments = newCheckAll
			? department.map((dept) => dept.uuid)
			: [];

		setInputValue((prev) => ({
			...prev,
			department: selectedDepartments,
		}));
	};

	const handleCheckboxChange = (uuid) => {
		const updatedCheckboxStates = {
			...checkboxStates,
			[uuid]: !checkboxStates[uuid],
		};

		setCheckboxStates(updatedCheckboxStates);

		const selectedDepartments = Object.keys(updatedCheckboxStates).filter(
			(key) => updatedCheckboxStates[key],
		);

		setInputValue((prev) => ({
			...prev,
			department: selectedDepartments,
		}));

		const allChecked = Object.values(updatedCheckboxStates).every(
			(value) => value,
		);
		setCheckAll(allChecked);
	};

	const handleCloseModal = (e) => {
		if (e.target === e.currentTarget) {
			onClick();
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
		department: [],
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

	const handleSubmit = () => {
		const response = updateDetailAgenda({ data: inputValue });

		if (response && response.payload.statusCode === 200) {
			navigation(-1);
		}
	};

	console.log(data);

	return (
		<div
			onClick={handleCloseModal}
			className={`fixed top-0 left-0 w-full min-h-screen h-auto bg-light-secondary bg-opacity-10 flex justify-end z-20 inset-y-0 transform transition-transform duration-1000 ${
				isShow ? 'translate-x-0' : 'translate-x-full'
			}`}
		>
			<div
				className={`h-screen overflow-y-auto bg-light-white pb-5 drop-shadow-right transition-all duration-1000 ${variant}`}
			>
				<section className="sticky top-0 py-5 px-8 bg-light-white flex justify-between items-center">
					<h1 className="text-lg font-semibold">Detail Agenda</h1>
					<FontAwesomeIcon
						icon={faXmark}
						className="cursor-pointer"
						onClick={onClick}
					/>
				</section>

				<section className="flex flex-col px-8 gap-3 mt-5">
					<FormInput
						inputvariant="text-sm font-normal"
						labelvariant="text-xs"
						label="Agenda"
						value={inputValue.title}
						name="title"
						onChange={handleInputValue}
					/>
					<FormInput
						inputvariant="text-sm font-normal"
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
						inputvariant="text-sm font-normal"
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
						inputvariant="text-sm font-normal"
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
					>
						<option value="" className="text-light-secondary">
							Pilih jenis agenda
						</option>
						{typeAgenda.map((item, index) => (
							<option
								value={item.uuid}
								className="text-secondary"
								key={index}
								selected={inputValue.typeAgenda === item.uuid}
							>
								{item.name}
							</option>
						))}
					</FormSelect>
					<FormCheckbox label="Anggota">
						<FormInputCheckbox
							text="Pilih Semua"
							onClick={handleCheckAll}
							isSelected={checkAll}
						/>
						{department.map((item, index) => (
							<FormInputCheckbox
								text={item.name}
								value={item.uuid}
								key={index}
								onChange={() => {
									handleCheckboxChange(item.uuid);
									handleInputValue();
								}}
								isSelected={checkboxStates[item.uuid] || false}
							/>
						))}
					</FormCheckbox>
					<FormInput
						inputvariant="text-sm font-normal"
						labelvariant="text-xs"
						label="Notulensi"
						type="file"
						note="Pastikan file memiliki format .pdf, .doc, atau .docx"
						fileAccept=".pdf, .doc, .docx"
						name="notulens"
						onChange={handleInputValue}
					/>
					<FormInput
						inputvariant="text-sm font-normal"
						labelvariant="text-xs"
						label="Absensi"
						type="file"
						note="Pastikan file memiliki format .jpg, .jpeg, atau .png"
						fileAccept=".jpg, .jpeg, .png"
						name="attendees"
						onChange={handleInputValue}
					/>

					<div className="mt-5 flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Button
								text="Update"
								variant={`${data && data.isDone === true ? 'bg-light-secondary cursor-not-allowed' : 'bg-light-primary'} bg-opacity-90 text-light-white text-sm hover:bg-opacity-100`}
								onClick={
									data && data.isDone !== true
										? handleSubmit
										: () => {}
								}
							/>
							<Button
								onClick={onClick}
								text="Batal"
								variant="bg-light-primary bg-opacity-30 text-light-primary text-sm hover:bg-opacity-50"
							/>
						</div>
						<Button
							text="Hapus"
							variant="bg-light-danger bg-opacity-80 text-light-white text-sm hover:bg-opacity-100"
						/>
					</div>
				</section>
			</div>
		</div>
	);
};

export default DetailAgendaSidebar;
