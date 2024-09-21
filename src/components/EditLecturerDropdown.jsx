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
	const [isUpdating, setIsUpdating] = useState(false);
	const [actionType, setActionType] = useState('');
	const dispatch = useDispatch();
	const departments = useSelector(
		(state) => state.fetchDepartments.departments,
	);

	useEffect(() => {
		dispatch(fetchDepartments());
		// dispatch(fetchLecturers());
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
						updateLecturerData(values.uuid, {
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

	const handleChange = (e) => {
		const { name, value } = e.target;

		formik.setFieldValue(name, value);
	};
	return (
		<>
			<div className="px-5 bg-white shadow-md rounded pb-4">
				<form onSubmit={formik.handleSubmit}>
					<p>{formik.values.name}</p>
					<p>{formik.values.email}</p>
					<p>{formik.values.phoneNumber}</p>
					<p>{formik.values.departmentUuid}</p>
					<div className="w-full flex items-center w">
						<Input
							type="text"
							name="name"
							variant="flex items-center text-sm w-full gap-10 py-2"
							label="Nama Dosen"
							placeholder="Nama Dosen"
							labelvariant="w-1/6"
							inputvariant="w-5/6"
							value={formik.values.name}
							onChange={handleChange}
						/>
					</div>
					<div className="w-full flex items-center">
						<Input
							type="email"
							name="email"
							label="E-mail"
							placeholder="example@mail.com"
							labelvariant="w-1/6"
							inputvariant="w-5/6"
							variant="flex items-center text-sm w-full gap-10 py-2"
							value={formik.values.email}
							onChange={handleChange}
						/>
					</div>
					<div className="w-full flex items-center">
						<Input
							type="number"
							name="phoneNumber"
							labelvariant="w-1/6"
							inputvariant="w-5/6"
							variant="flex items-center text-sm w-full gap-10 py-2"
							label="No. Whatsapp"
							placeholder="08*********"
							value={formik.values.phoneNumber}
							onChange={handleChange}
						/>
					</div>
					<div className="w-full flex items-center">
						<Select
							variant="flex items-center text-sm w-full gap-10 py-2"
							name="departmentUuid"
							label="Program Studi"
							labelVariant="w-1/5"
							selectVariant="w-5/6"
							placeholder="082********"
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
					</div>
					<div className="flex items-center gap-8">
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
