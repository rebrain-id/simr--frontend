import { useState } from 'react';
import Button from '../elements/Button';
import FormInput from '../elements/forms/FormInput';
import { useDispatch } from 'react-redux';
import {
	updateDepartmentData,
	deleteDepartmentData,
	fetchDepartments,
	fetchDepartmentsModal,
} from '../redux/actions/departmentAction';
import Alert from '../elements/Alert';
import { useFormik } from 'formik';

const EditDepartmentDropdown = (props) => {
	const { uuid, name, username, password, close } = props;
	const dispatch = useDispatch();
	const [isDeleting, setIsDeleting] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [actionType, setActionType] = useState('');

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			uuid: uuid,
			name: name || '',
		},
		onSubmit: async (values) => {
			if (actionType === 'update') {
				setIsUpdating(true);
				const response = await dispatch(
					updateDepartmentData(values.uuid, {
						name: values.name,
					}),
				);
				if (response && response.statusCode === 200) {
					close();
					dispatch(fetchDepartments());
				} else {
					setIsUpdating(false);
					dispatch(fetchDepartments());
				}
			} else if (actionType === 'delete') {
				dispatch(fetchDepartmentsModal(values.uuid));
			}
		},
	});

	const handleFormInput = (e) => {
		const { name, value } = e.target;

		formik.setFieldValue(name, value);
	};

	return (
		<>
			<div className="px-5 bg-white drop-shadow-bottom rounded pb-5">
				<form onSubmit={formik.handleSubmit}>
					<div className="w-full flex items-center">
						<FormInput
							name="name"
							type="text"
							variant="flex items-center text-sm w-full gap-10 py-2"
							label="Nama Program Studi"
							placeholder="Nama Program Studi"
							labelvariant="text-xs"
							inputvariant="w-full mt-1"
							value={formik.values.name}
							onChange={handleFormInput}
						/>
					</div>
					<div className="flex items-center justify-between gap-8 mt-3">
						<div className="flex items-center gap-4">
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
		</>
	);
};

export default EditDepartmentDropdown;
