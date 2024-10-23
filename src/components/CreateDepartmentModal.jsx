import { useState } from 'react';
import Button from '../elements/Button';
import Input from '../elements/forms/FormInput';
import { useFormik } from 'formik';
import {
	fetchDepartments,
	postDepartmentData,
} from '../redux/actions/departmentAction';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const CreateDepartmentModal = (props) => {
	const { close } = props;
	const dispatch = useDispatch();
	const [isSubmit, setIsSubmit] = useState(false);

	const formik = useFormik({
		initialValues: {
			name: '',
			username: '',
			password: '',
		},
		onSubmit: async (values) => {
			setIsSubmit(true);
			const response = await dispatch(postDepartmentData(values));

			if (response && response.statusCode === 201) {
				close();
				dispatch(fetchDepartments());
			} else {
				close();
				setIsSubmit(false);
				dispatch(fetchDepartments());
			}
		},
	});

	const handleFormInput = (e) => {
		formik.setFieldValue(e.target.name, e.target.value);
	};

	const handleClose = (e) => {
		if (e.target === e.currentTarget) {
			close();
		}
	};

	return (
		<>
			<div
				onClick={handleClose}
				className={`w-full h-full absolute top-0 left-0 right-0 flex items-center justify-center z-30 bg-light-secondary/40`}
			>
				<div className="bg-light-white p-5 rounded w-1/2 shadow-md">
					<section className="flex items-center justify-between mb-5">
						<h2 className="text-md font-medium">
							Tambah Program Studi
						</h2>

						<FontAwesomeIcon
							icon={faXmark}
							className="cursor-pointer"
							onClick={close}
						/>
					</section>
					<form
						className="flex flex-col gap-3"
						onSubmit={formik.handleSubmit}
					>
						<Input
							variant="flex flex-col"
							type="text"
							name="name"
							label="Program Studi"
							// note="Wajib diisi"
							labelvariant="text-xs font-medium pb-2"
							inputvariant="w-full"
							// placeholder="Nama Program Studi"
							onChange={handleFormInput}
							value={formik.values.name}
						/>
						<Input
							variant="flex flex-col"
							type="text"
							name="username"
							label="Username"
							// note="Wajib diisi"
							labelvariant="text-xs font-medium pb-2"
							inputvariant="w-full"
							// placeholder="Username Program Studi"
							onChange={handleFormInput}
							value={formik.values.username}
						/>
						<Input
							variant="flex flex-col"
							type="text"
							name="password"
							label="Password"
							// note="Wajib diisi"
							labelvariant="text-xs font-medium pb-1"
							inputvariant="w-full"
							isPassword
							onChange={handleFormInput}
							value={formik.values.password}
						/>
						<div className="flex items-center justify-end gap-4">
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
