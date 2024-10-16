import { useState } from 'react';
import Button from '../elements/Button';
import Input from '../elements/forms/FormInput';
import Select from '../elements/forms/FormSelect';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchLecturers,
	postLecturerData,
} from '../redux/actions/lecturerAction';
import Alert from '../elements/Alert';

const CreateLecturerModal = (props) => {
	const { close } = props;
	const dispatch = useDispatch();
	const departments = useSelector(
		(state) => state.fetchDepartments.department,
	);
	const [showAlert, setShowAlert] = useState({
		status: '',
		message: '',
		visible: false,
	});
	const [isSubmit, setIsSubmit] = useState(false);

	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			phoneNumber: '',
			departmentUuid: '',
		},
		onSubmit: async (values, { resetForm }) => {
			setIsSubmit(true);
			const response = await dispatch(postLecturerData(values));
			if (response && response.statusCode === 201) {
				setTimeout(() => {
					resetForm();
					setIsSubmit(false);
					setShowAlert({
						status: 'success',
						message: 'Berhasil menambahkan dosen',
						visible: true,
					});
				}, 500);
				dispatch(fetchLecturers());
			} else if (response && response.statusCode === 400) {
				setIsSubmit(false);
				setShowAlert({
					status: 'danger',
					message: 'Gagal menambahkan dosen',
					visible: true,
				});
			}
		},
	});

	const handleFormInput = (e) => {
		formik.setFieldValue(e.target.name, e.target.value);
	};
	return (
		<>
			<div
				className={`bg-black/25 h-screen fixed top-0 left-0 right-0 bottom-0 z-10`}
			>
				<div className="absolute w-1/2 px-8 rounded-lg shadow-lg right-0 top-0 transform -translate-x-1/2 translate-y-1/4 bg-white">
					<h2 className="text-2xl font-medium pb-8 py-2">
						Tambah Dosen
					</h2>
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
						<Input
							variant="flex flex-col"
							type="text"
							name="name"
							label="Nama Dosen"
							note="Wajib diisi"
							labelvariant="text-md pb-2"
							inputvariant="text-md w-full"
							placeholder="Nama Dosen"
							onChange={handleFormInput}
							value={formik.values.name}
						/>
						<Input
							variant="flex flex-col "
							type="email"
							name="email"
							label="E-mail"
							note="Wajib diisi"
							labelvariant="text-md py-2"
							inputvariant="text-md w-full"
							placeholder="example@mail.com"
							onChange={handleFormInput}
							value={formik.values.email}
						/>
						<Input
							variant="flex flex-col "
							type="text"
							name="phoneNumber"
							label="No. Whatsapp"
							note="Wajib diisi"
							labelvariant="text-md py-2"
							inputvariant="text-md w-full"
							placeholder="082********"
							onChange={handleFormInput}
							value={formik.values.phoneNumber}
						/>
						<Select
							variant="flex flex-col"
							name="departmentUuid"
							label="Program Studi"
							note="Wajib diisi"
							labelVariant="text-md py-2"
							selectVariant="text-md"
							placeholder="082********"
							onChange={handleFormInput}
							value={formik.values.departmentUuid}
						>
							<option value="" disabled>
								Pilih Program Studi
							</option>
							{departments.map((item, index) => (
								<option value={item.uuid} key={index}>
									{item.name}
								</option>
							))}
						</Select>
						<div className="flex items-center justify-end gap-4 pb-10">
							{isSubmit ? (
								<Button
									type="submit"
									text="Simpan..."
									variant="bg-light-secondary text-white rounded text-sm hover:bg-primary transition-all ease-in 3s pointer-events-none"
									isDisabled={true}
								/>
							) : (
								<>
									<Button
										type="submit"
										text="Simpan"
										variant="bg-light-primary text-white rounded text-sm hover:bg-primary transition-all ease-in 3s"
										isDisabled={false}
									/>
								</>
							)}
							<Button
								text="Batal"
								variant="bg-light-secondary/25 text-light-primary rounded text-sm hover:bg-danger hover:text-white transition-all ease-in 3s"
								onClick={close}
							/>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default CreateLecturerModal;
