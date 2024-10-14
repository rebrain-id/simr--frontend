import { useState } from 'react';
import Button from '../elements/Button';
import FormInput from '../elements/forms/FormInput';
import { useDispatch } from 'react-redux';
import {
	updateDepartmentData,
	deleteDepartmentData,
	fetchDepartments,
} from '../redux/actions/departmentAction';
import Alert from '../elements/Alert';
import { useFormik } from 'formik';

const EditDepartmentDropdown = (props) => {
	const { uuid, name, username, password, close } = props;
	const dispatch = useDispatch();
	const [isDeleting, setIsDeleting] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [actionType, setActionType] = useState('');
	const [showAlert, setShowAlert] = useState({
		status: '',
		message: '',
		visible: false,
	});

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
					setTimeout(() => {
						setIsUpdating(false);
						setShowAlert({
							status: 'success',
							message: 'Berhasil mengupdate program studi',
							visible: true,
						});
					}, 500);
					dispatch(fetchDepartments());
				} else if (response && response.statusCode === 400) {
					setTimeout(() => {
						setIsUpdating(false);
						setShowAlert({
							status: 'danger',
							message: 'Gagal mengupdate program studi',
							visible: true,
						});
					}, 500);
				}
			} else if (actionType === 'delete') {
				setIsDeleting(true);
				const response = await dispatch(
					deleteDepartmentData(values.uuid),
				);
				if (response && response.statusCode === 200) {
					setTimeout(() => {
						setIsDeleting(false);
						setShowAlert({
							status: 'success',
							message: 'Berhasil menghapus program studi',
							visible: true,
						});
					}, 500);
					dispatch(fetchDepartments());
				} else if (response && response.statusCode === 400) {
					setTimeout(() => {
						setIsDeleting(false);
						setShowAlert({
							status: 'danger',
							message: 'Gagal menghapus program studi',
							visible: true,
						});
					}, 500);
				}
			}
		},
	});

	const handleFormInput = (e) => {
		const { name, value } = e.target;

		formik.setFieldValue(name, value);
	};

	return (
		<>
			{showAlert.visible && (
				<Alert
					status={showAlert.status}
					message={showAlert.message}
					onClick={() =>
						setShowAlert({ ...showAlert, visible: false })
					}
				/>
			)}
			<div className="px-5 bg-white shadow-md rounded pb-4">
				<form onSubmit={formik.handleSubmit}>
					<div className="w-full flex items-center">
						<FormInput
							name="name"
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
