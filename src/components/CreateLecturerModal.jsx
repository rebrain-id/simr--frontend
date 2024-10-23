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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const CreateLecturerModal = (props) => {
	const { close, role } = props;
	const dispatch = useDispatch();
	const departments = useSelector(
		(state) => state.fetchDepartments.department,
	);
	const [isSubmit, setIsSubmit] = useState(false);

	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			phoneNumber: '',
			departmentUuid: role === 'PRODI' ? departments[0].uuid : '',
		},
		onSubmit: async (values) => {
			setIsSubmit(true);
			const response = await dispatch(postLecturerData(values));
			if (response && response.statusCode === 201) {
				setIsSubmit(false);
				close();
				dispatch(fetchLecturers());
			} else {
				setIsSubmit(false);
				close();
				dispatch(fetchLecturers());
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
				<div className="absolute w-1/2 p-5 rounded-lg shadow-lg right-0 top-0 transform -translate-x-1/2 translate-y-1/4 bg-white">
					<section className="flex items-center justify-between mb-5">
						<h2 className="text-md font-medium">
							Tambah Data Dosen
						</h2>

						<FontAwesomeIcon
							icon={faXmark}
							className="cursor-pointer"
							onClick={close}
						/>
					</section>
					<form
						onSubmit={formik.handleSubmit}
						className="flex flex-col gap-3"
					>
						<Input
							variant="flex flex-col"
							type="text"
							name="name"
							label="Nama Dosen"
							// note="Wajib diisi"
							labelvariant="text-xs font-medium mb-1"
							inputvariant="w-full"
							// placeholder="Nama Dosen"
							onChange={handleFormInput}
							value={formik.values.name}
						/>
						<Input
							variant="flex flex-col "
							type="email"
							name="email"
							label="E-mail"
							// note="Wajib diisi"
							labelvariant="text-xs font-medium mb-1"
							inputvariant="w-full"
							// placeholder="example@mail.com"
							onChange={handleFormInput}
							value={formik.values.email}
						/>
						<Input
							variant="flex flex-col "
							type="text"
							name="phoneNumber"
							label="No. Whatsapp"
							// note="Wajib diisi"
							labelvariant="text-xs font-medium mb-1"
							inputvariant="w-full"
							// placeholder="082********"
							onChange={handleFormInput}
							value={formik.values.phoneNumber}
						/>
						{role === 'FAKULTAS' && (
							<Select
								variant="flex flex-col"
								name="departmentUuid"
								label="Program Studi"
								// note="Wajib diisi"
								labelVariant="text-xs font-medium mb-1"
								selectVariant=""
								// placeholder="082********"
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
						)}
						<div className="flex items-center justify-end gap-4 mt-5">
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
