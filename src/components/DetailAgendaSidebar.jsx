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
import { fetchDepartments } from '../redux/actions/departmentAction';

const DetailAgendaSidebar = (props) => {
	const { onClick, data, isShow = false } = props;
	const [checkAll, setCheckAll] = useState(false);
	const [checkboxStates, setCheckboxStates] = useState({});

	const dispatch = useDispatch();
	const typeAgenda = useSelector((state) => state.typeAgenda.typeAgenda);
	const department = useSelector((state) => state.department.department);

	useEffect(() => {
		dispatch(fetchTypeAgenda());
		dispatch(fetchDepartments());

		// if (data && department) {
		// 	const initialCheckboxStates = department.reduce((acc, dept) => {
		// 		acc[dept.uuid] = data.departments.includes(dept.uuid);
		// 		return acc;
		// 	}, {});

		// 	setCheckboxStates(initialCheckboxStates);
		// }
	}, [dispatch]);

	const handleCheckAll = () => {
		const newCheckAll = !checkAll;
		setCheckAll(newCheckAll);

		const updatedCheckboxStates = department.reduce((acc, dept) => {
			acc[dept.uuid] = newCheckAll;
			return acc;
		}, {});

		setCheckboxStates(updatedCheckboxStates);
	};

	const handleCheckboxChange = (uuid) => {
		const updatedCheckboxStates = {
			...checkboxStates,
			[uuid]: !checkboxStates[uuid],
		};

		setCheckboxStates(updatedCheckboxStates);

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

	console.log(data);

	return (
		<div
			onClick={handleCloseModal}
			className={`fixed top-0 left-0 w-full min-h-screen h-auto bg-light-secondary bg-opacity-10 flex justify-end z-20 inset-y-0 transform transition-transform duration-1000 ${
				isShow ? 'translate-x-0' : 'translate-x-full'
			}`}
		>
			<div className="h-screen overflow-y-auto bg-light-white pb-5 drop-shadow-right">
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
						value={data.title}
					/>
					<FormInput
						inputvariant="text-sm font-normal"
						labelvariant="text-xs"
						label="Dari"
						type="datetime-local"
						value={moment(data.start).format('YYYY-MM-DDTHH:mm')}
					/>
					<FormInput
						inputvariant="text-sm font-normal"
						labelvariant="text-xs"
						label="Sampai"
						type="datetime-local"
						value={moment(data.finish).format('YYYY-MM-DDTHH:mm')}
					/>
					<FormInput
						inputvariant="text-sm font-normal"
						labelvariant="text-xs"
						label="Tempat"
						value={data.location}
					/>
					<FormTextarea label="Deskripsi" value={data.description} />
					<FormSelect label="Kategori">
						<option value="" className="text-light-secondary">
							Pilih jenis agenda
						</option>
						{typeAgenda.map((item, index) => (
							<option
								value={item.uuid}
								className="text-secondary"
								key={index}
								selected={data.typeAgenda.uuid === item.uuid}
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
								onChange={() => handleCheckboxChange(item.uuid)}
								isSelected={data.departments.includes(
									item.uuid,
								)}
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
					/>
					<FormInput
						inputvariant="text-sm font-normal"
						labelvariant="text-xs"
						label="Absensi"
						type="file"
						note="Pastikan file memiliki format .jpg, .jpeg, atau .png"
						fileAccept=".jpg, .jpeg, .png"
					/>

					<div className="mt-5 flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Button
								text="Update"
								variant="bg-light-primary bg-opacity-90 text-light-white text-sm hover:bg-opacity-100"
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
