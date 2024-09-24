import { useEffect, useState } from 'react';
import Button from '../elements/Button';
import FormInput from '../elements/forms/FormInput';
import { useDispatch, useSelector } from 'react-redux';
import {
	updateDepartmentData,
	deleteDepartmentData,
	fetchDepartments,
} from '../redux/actions/departmentAction';
import { useFormik } from 'formik';

const EditDepartmentDropdown = (props) => {
	const { uuid, name, username, password, close } = props;
	const [isDeleting, setIsDeleting] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [actionType, setActionType] = useState('');
	const { loading, error } = useSelector(
		(state) => state.deleteDepartmentData,
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchDepartments());
	}, [dispatch]);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			uuid: uuid,
			name: name || '',
		},
		onSubmit: async (values, { resetForm }) => {
			if (actionType === 'update') {
				setIsUpdating(true);
				const timeout = setTimeout(() => {
					setIsUpdating(false);
					dispatch(
						updateDepartmentData(values.uuid, {
							name: values.name,
						}),
					);
				}, 1500);
				return () => clearTimeout(timeout);
			} else if (actionType === 'delete') {
				setIsDeleting(true);
				const timeout = setTimeout(() => {
					setIsDeleting(false);
					dispatch(deleteDepartmentData(values.uuid));
					resetForm();
				}, 1500);
				return () => clearTimeout(timeout);
			}
		},
	});

	const handleFormInput = (e) => {
		const { value } = e.target;

		formik.setFieldValue('name', value);
	};

	return (
		<>
			<div className="px-5 bg-white shadow-md rounded pb-4">
				<form onSubmit={formik.handleSubmit}>
					<div className="w-full flex items-center">
						<FormInput
							name={name}
							type="text"
							variant="flex items-center text-sm w-full gap-10 py-2"
							label="Nama Program Studi"
							placeholder="Nama Program Studi"
							labelvariant="w-1/5"
							inputvariant="w-5/6"
							value={formik.values.name}
							onChange={handleFormInput}
						/>
					</div>
					{/* <div className="w-full flex items-center">
						<FormInput
							name={username}
							type="text"
							variant="flex items-center text-sm w-full gap-10 py-2"
							label="Username"
							placeholder="Username"
							labelvariant="w-1/5"
							inputvariant="w-5/6"
							value={form.username}
							onChange={handleForm}
						/>
					</div>
					<div className="w-full flex items-center">
						<FormInput
							name={password}
							type="password"
							variant="flex items-center text-sm w-full gap-10 py-2"
							label="Password"
							placeholder="*********"
							labelvariant="w-1/5"
							inputvariant="w-5/6"
							value={form.password}
							onChange={handleForm}
						/>
					</div> */}
					<div className="flex items-center justify-between gap-8">
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

export default EditDepartmentDropdown;
