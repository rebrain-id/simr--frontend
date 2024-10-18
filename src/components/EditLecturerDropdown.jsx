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
import Alert from '../elements/Alert';

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
	} = props;
	const [isDeleting, setIsDeleting] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [actionType, setActionType] = useState('');
	const [showAlert, setShowAlert] = useState({
		status: '',
		message: '',
		visible: false,
	});
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
					setTimeout(() => {
						setIsUpdating(false);
						setShowAlert({
							status: 'success',
							message: 'Berhasil mengupdate dosen',
							visible: true,
						});
					}, 500);
					dispatch(fetchLecturers());
				} else if (response && response.statusCode === 400) {
					setTimeout(() => {
						setIsUpdating(false);
						setShowAlert({
							status: 'danger',
							message: 'Gagal mengupdate dosen',
							visible: true,
						});
					}, 500);
				}
			} else if (actionType === 'delete') {
				setIsDeleting(true);
				const response = await dispatch(
					deleteLecturerData(values.uuid),
				);
				if (response && response.statusCode === 200) {
					setTimeout(() => {
						setIsDeleting(false);
						setShowAlert({
							status: 'success',
							message: 'Berhasil menghapus dosen',
							visible: true,
						});
					}, 500);
					dispatch(fetchLecturers());
				} else if (response && response.statusCode === 400) {
					setTimeout(() => {
						setIsDeleting(false);
						setShowAlert({
							status: 'danger',
							message: 'Gagal menghapus dosen',
							visible: true,
						});
					}, 500);
				}
			}
		},
	});

	const handleChange = (e) => {
		const { name, value } = e.target;

		formik.setFieldValue(name, value);
	};

	return (
		<div
			className={`transition-[height] duration-300 px-10 pb-5 bg-white shadow-md rounded ${isOpenEdit ? 'h-full' : 'h-0 overflow-hidden'}`}
		>
			{showAlert.visible && (
				<Alert
					status={showAlert.status}
					message={showAlert.message}
					onClick={() =>
						setShowAlert({ ...showAlert, visible: false })
					}
				/>
			)}
			<form onSubmit={formik.handleSubmit}>
				<div>
					<Input
						type="text"
						name="name"
						variant="text-xs w-full py-2"
						label="Nama Dosen"
						placeholder="Nama Dosen"
						labelvariant="w-1/6 text-xs"
						inputvariant="w-full"
						value={formik.values.name}
						onChange={handleChange}
					/>
				</div>
				<div className="pt-1">
					<Input
						type="email"
						name="email"
						variant="text-xs w-full"
						label="E-mail"
						placeholder="example@mail.com"
						labelvariant="w-1/6 text-xs"
						inputvariant="w-full"
						value={formik.values.email}
						onChange={handleChange}
					/>
				</div>
				<div className="pt-1">
					<Input
						type="text"
						name="phoneNumber"
						variant="text-xs w-full py-2"
						label="No. Whatsapp"
						labelvariant="w-1/6"
						inputvariant="w-full"
						placeholder="08*********"
						value={formik.values.phoneNumber}
						onChange={handleChange}
					/>
				</div>
				<div className="pb-2">
					<Select
						variant="flex flex-col text-xs w-full pt-1 pb-2"
						name="departmentUuid"
						label="Program Studi"
						labelVariant="w-1/5 text-sx"
						selectVariant="w-full text-xs"
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
	);
};

export default EditLecturerDropdown;
