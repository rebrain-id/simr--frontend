import { useState } from 'react';
import Button from '../elements/Button';
import Input from '../elements/forms/FormInput';
import Select from '../elements/forms/FormSelect';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
	fetchLecturers,
	fetchOpenModal,
	updateLecturerData,
} from '../redux/actions/lecturerAction';

const EditLecturerDropdown = (props) => {
	const {
		uuid,
		name,
		email,
		phoneNumber,
		department,
		departmentUuid,
		close,
		isOpenEdit,
		role,
	} = props;
	const [isDeleting, setIsDeleting] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [actionType, setActionType] = useState('');
	const dispatch = useDispatch();
	const departments = useSelector(
		(state) => state.fetchDepartments.department,
	);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			uuid: uuid,
			name: name || '',
			email: email || '',
			phoneNumber: phoneNumber || '',
			departmentUuid: departmentUuid || '',
			department: department || '',
		},
		onSubmit: async (values) => {
			if (actionType === 'update') {
				setIsUpdating(true);
				const response = await dispatch(
					updateLecturerData(values.uuid, {
						name: values.name,
						email: values.email,
						phoneNumber: values.phoneNumber,
						departmentUuid: values.departmentUuid,
					}),
				);
				if (response && response.statusCode === 200) {
					dispatch(fetchLecturers());
				} else {
					setIsUpdating(false);
					dispatch(fetchLecturers());
				}
			} else if (actionType === 'delete') {
				setIsDeleting(true);
				dispatch(fetchOpenModal(values.uuid));
			}
		},
	});

	const handleChange = (e) => {
		const { name, value } = e.target;

		formik.setFieldValue(name, value);
	};

	return (
		<div
			className={`transition-[height] duration-300 pb-5 bg-white drop-shadow-bottom rounded ${role === 'FAKULTAS' ? 'ms-8 px-5' : 'px-5'} ${isOpenEdit ? 'h-full' : 'h-0 overflow-hidden'}`}
		>
			<form
				onSubmit={formik.handleSubmit}
				className="flex flex-col gap-3"
			>
				<div>
					<Input
						type="text"
						name="name"
						variant="w-full"
						label="Nama Dosen"
						placeholder="Nama Dosen"
						labelvariant="w-1/6 text-xs"
						inputvariant="w-full mt-1 text-sm"
						value={formik.values.name}
						onChange={handleChange}
					/>
				</div>
				<div className="pt-1">
					<Input
						type="email"
						name="email"
						variant="w-full"
						label="E-mail"
						placeholder="example@mail.com"
						labelvariant="w-1/6 text-xs"
						inputvariant="w-full mt-1 text-sm"
						value={formik.values.email}
						onChange={handleChange}
					/>
				</div>
				<div className="pt-1">
					<Input
						type="text"
						name="phoneNumber"
						variant="w-full py-2"
						label="No. Whatsapp"
						labelvariant="w-1/6 text-xs"
						inputvariant="w-full mt-1 text-sm"
						placeholder="08*********"
						value={formik.values.phoneNumber}
						onChange={handleChange}
					/>
				</div>
				<div className="pb-2">
					{role === 'FAKULTAS' && (
						<Select
							variant="flex flex-col w-full pt-1 pb-2"
							name="departmentUuid"
							label="Program Studi"
							labelVariant="w-1/5 text-xs"
							selectVariant="w-full mt-1 text-sm"
							onChange={handleChange}
							value={formik.values.departmentUuid}
						>
							<option value={departmentUuid} disabled>
								{department}
							</option>
							{departments.map((item, index) => (
								<option value={item.uuid} key={index}>
									{item.name}
								</option>
							))}
						</Select>
					)}
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-5">
						{isUpdating ? (
							<Button
								text="Updating..."
								variant="bg-light-primary text-white rounded text-sm"
								isDisabled={true}
							/>
						) : (
							<Button
								type="submit"
								text="Update"
								variant="bg-light-primary text-white rounded text-sm hover:bg-primary transition ease-in 3s"
								onClick={() => setActionType('update')}
							/>
						)}
						<Button
							text="Batal"
							variant="bg-light-primary/25 text-primary rounded text-sm hover:bg-danger hover:text-white transition ease-in 3s"
							onClick={close}
						/>
					</div>
					{isDeleting ? (
						<Button
							type="submit"
							text="Deleting..."
							variant="bg-light-danger text-white rounded text-sm pointer-events-none"
							isDisabled={true}
						/>
					) : (
						<Button
							type="submit"
							text="Delete"
							variant="bg-light-danger text-white rounded text-sm hover:bg-danger hover:text-white transition ease-in 3s"
							onClick={() => setActionType('delete')}
						/>
					)}
				</div>
			</form>
		</div>
	);
};

export default EditLecturerDropdown;
