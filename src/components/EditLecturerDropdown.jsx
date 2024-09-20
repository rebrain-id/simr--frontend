import { useState } from 'react';
import Button from '../elements/Button';
import Input from '../elements/forms/FormInput';
import Select from '../elements/forms/FormSelect';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { fetchDepartments } from '../redux/actions/departmentAction';
import {
	fetchLecturers,
	deleteLecturerData,
	updateLecturerData,
} from '../redux/actions/lecturerAction';
import { useEffect } from 'react';

const EditLecturerDropdown = (props) => {
	const {
		uuid,
		name,
		email,
		phoneNumber,
		department,
		departmentUuid,
		close,
	} = props;
	const [isDeleting, setIsDeleting] = useState(false);
	const [actionType, setActionType] = useState('');
	const dispatch = useDispatch();
	const departments = useSelector(
		(state) => state.fetchDepartments.departments,
	);

	useEffect(() => {
		dispatch(fetchDepartments());
		dispatch(fetchLecturers());
	}, [dispatch]);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			uuid: uuid,
			name: name || '',
			email: email || '',
			phoneNumber: phoneNumber || 0,
			departmentUuid: departmentUuid || '',
			department: department || '',
		},
		onSubmit: async (values, { resetForm }) => {
			if (actionType === 'update') {
				setIsUpdating(true);
				const timeout = setTimeout(() => {
					setIsUpdating(false);
					dispatch(
						updateDepartmentData(values.uuid, {
							name: values.name,
							email: values.email,
							phoneNumber: values.phoneNumber,
							departmentUuid: values.departmentUuid,
						}),
					);
				}, 1500);
				return () => clearTimeout(timeout);
			} else if (actionType === 'delete') {
				setIsDeleting(true);
				const timeout = setTimeout(() => {
					setIsDeleting(false);
					dispatch(deleteLecturerData(values.uuid));
					resetForm();
				}, 1500);
				return () => clearTimeout(timeout);
			}
		},
	});

	const handleFormInput = (e) => {
		const { value } = e.target;

		formik.setFieldValue('name', value);
		formik.setFieldValue('email', value);
		formik.setFieldValue('phoneNumber', value);
		formik.setFieldValue('departmentUuid', value);
	};
	return (
		<>
			<div className="px-5 bg-white shadow-md rounded pb-4">
				<form onSubmit={formik.handleSubmit}>
					<div className="w-full flex items-center w">
						<Input
							name="name"
							variant="flex items-center text-sm w-full gap-10 py-2"
							label="Nama Dosen"
							placeholder="Nama Dosen"
							labelvariant="w-1/6"
							inputvariant="w-5/6"
							value={formik.values.name}
							onChange={handleFormInput}
						/>
					</div>
					<div className="w-full flex items-center">
						<Input
							name="email"
							label="E-mail"
							placeholder="example@mail.com"
							labelvariant="w-1/6"
							inputvariant="w-5/6"
							variant="flex items-center text-sm w-full gap-10 py-2"
							value={formik.values.email}
							onChange={handleFormInput}
						/>
					</div>
					<div className="w-full flex items-center">
						<Input
							name="phoneNumber"
							labelvariant="w-1/6"
							inputvariant="w-5/6"
							variant="flex items-center text-sm w-full gap-10 py-2"
							label="No. Whatsapp"
							placeholder="08*********"
							value={formik.values.phoneNumber}
							onChange={handleFormInput}
						/>
					</div>
					<div className="w-full flex items-center">
						<Select
							variant="flex flex-col"
							name="departmentUuid"
							label="No. Whatsapp"
							note="Wajib diisi"
							labelVariant="text-md py-2"
							selectVariant="text-md"
							placeholder="082********"
							onChange={handleFormInput}
							value={formik.values.departmentUuid}
						>
							<option value="" disabled>
								{department}
							</option>
							{departments.map((item, index) => (
								<option value={item.uuid} key={index}>
									{item.name}
								</option>
							))}
						</Select>
					</div>
					<div className="flex items-center gap-8">
						<Button
							text="Update"
							variant="bg-light-primary text-white rounded text-sm hover:bg-primary transition ease-in 3s"
						/>
						<Button
							text="Batal"
							variant="bg-light-primary/25 text-primary rounded text-sm hover:bg-danger hover:text-white transition ease-in 3s"
							onClick={close}
						/>
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
								isDisabled={false}
								onClick={() => setActionType('delete')}
							/>
						)}
					</div>
				</form>
			</div>
		</>
	);
};

export default EditLecturerDropdown;
