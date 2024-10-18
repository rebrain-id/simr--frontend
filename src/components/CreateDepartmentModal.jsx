import { useState } from 'react';
import Button from '../elements/Button';
import Input from '../elements/forms/FormInput';
import { useFormik } from 'formik';
import {
	fetchDepartments,
	postDepartmentData,
} from '../redux/actions/departmentAction';
import { useDispatch } from 'react-redux';
import Alert from '../elements/Alert';

const CreateDepartmentModal = (props) => {
	const { close } = props;
	const dispatch = useDispatch();
	const [isSubmit, setIsSubmit] = useState(false);
	const [showAlert, setShowAlert] = useState({
		status: '',
		message: '',
		visible: false,
	});

	const formik = useFormik({
		initialValues: {
			name: '',
		},
		onSubmit: async (values, { resetForm }) => {
			setIsSubmit(true);
			const response = await dispatch(postDepartmentData(values));
			if (response && response.statusCode === 201) {
				setTimeout(() => {
					resetForm();
					setIsSubmit(false);
					setShowAlert({
						status: 'success',
						message: 'Berhasil menambahkan program studi',
						visible: true,
					});
				}, 500);
				dispatch(fetchDepartments());
			} else if (response && response.statusCode === 400) {
				setIsSubmit(false);
				setShowAlert({
					status: 'danger',
					message: 'Gagal menambahkan program studi',
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
				className={`bg-black/25 w-full h-screen fixed top-0 left-0 right-0 bottom-0 z-10`}
			>
				<div className="absolute w-1/2 px-8 rounded-lg shadow-lg right-0 top-0 transform -translate-x-1/2 translate-y-1/2 bg-white">
					<h2 className="text-2xl font-medium pb-8 py-2">
						Tambah Program Studi
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
							label="Nama Program Studi"
							note="Wajib diisi"
							labelvariant="text-md pb-2"
							inputvariant="text-md w-full"
							placeholder="Nama Program Studi"
							onChange={handleFormInput}
							value={formik.values.name}
						/>
						{/* <Input
							variant="flex flex-col"
							type="text"
							label="Username"
							note="Wajib diisi"
							labelvariant="text-md py-2"
							inputvariant="text-md"
							placeholder="Username"
						/>
						<Input
							variant="flex flex-col"
							type="password"
							label="Password"
							note="Wajib diisi"
							labelvariant="text-md py-2"
							inputvariant="text-md"
							placeholder="*********"
						/> */}
						<div className="flex items-center justify-end gap-4 pb-10">
							{isSubmit ? (
								<Button
									type="submit"
									text="Simpan..."
									variant="bg-light-secondary text-white rounded text-sm hover:bg-primary transition-all ease-in 3s pointer-events-none"
									isDisabled={true}
								/>
							) : (
								<Button
									type="submit"
									text="Simpan"
									variant="bg-light-primary text-white rounded text-sm hover:bg-primary transition-all ease-in 3s"
									isDisabled={false}
								/>
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

export default CreateDepartmentModal;
