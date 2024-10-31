import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormInput from '../elements/forms/FormInput';
import FormSelect from '../elements/forms/FormSelect';
import { useFormik } from 'formik';
import Button from '../elements/Button';
import { useDispatch } from 'react-redux';
import { fetchUser, postRegister } from '../redux/actions/authAction';

const ModalAddUser = (props) => {
	const { onClick, department } = props;
	const dispatch = useDispatch();

	const listJabatan = [
		'Pilih Jabatan',
		'Dekan',
		'Wakil Dekan',
		'Pengajaran',
		'Ketua Program Studi',
		'Sekretaris Program Studi',
	];

	const handleClose = (e) => {
		if (e.target === e.currentTarget) {
			onClick();
		}
	};

	const formik = useFormik({
		initialValues: {
			username: '',
			password: '',
			departmentUuid: '',
			jabatanValue: '',
		},

		onSubmit: async (values) => {
			const response = await dispatch(postRegister(values));

			if (response && response.statusCode === 201) {
				dispatch(fetchUser());
				onClick();
			}
		},
	});

	return (
		<section
			onClick={handleClose}
			className="fixed top-0 left-0 w-full min-h-screen h-full z-30 bg-light-secondary bg-opacity-10 flex items-center justify-center"
		>
			<div className="p-5 rounded drop-shadow w-1/2 bg-light-white flex flex-col items-center justify-center gap-5">
				<div className="w-full flex items-center justify-between mb-5">
					<h1 className="font-semibold">Tambah Pengguna</h1>
					<FontAwesomeIcon
						icon={faXmark}
						onClick={onClick}
						className="cursor-pointer"
					/>
				</div>

				<form
					onSubmit={formik.handleSubmit}
					className="w-full flex flex-col gap-3"
				>
					<FormInput
						type="text"
						name="username"
						variant={'w-full'}
						inputvariant={'w-full'}
						label={'Username'}
						labelvariant={'font-medium text-xs'}
						onChange={formik.handleChange}
						value={formik.values.username}
					/>
					<FormInput
						type="text"
						name="password"
						variant={'w-full'}
						inputvariant={'w-full'}
						label={'Password'}
						labelvariant={'font-medium text-xs'}
						onChange={formik.handleChange}
						value={formik.values.password}
						isPassword
					/>
					<FormSelect
						variant="flex flex-col w-full"
						name="departmentUuid"
						label="Program Studi"
						labelVariant="w-full text-xs"
						selectVariant="w-full mt-1 text-sm"
						value={formik.values.departmentUuid}
						onChange={formik.handleChange}
					>
						<option>Pilih Program Studi</option>
						{department.map((item, index) => (
							<option key={index} value={item.uuid}>
								{item.name}
							</option>
						))}
					</FormSelect>
					<FormSelect
						variant="flex flex-col w-full"
						name="jabatanValue"
						label="Jabatan"
						labelVariant="w-full text-xs"
						selectVariant="w-full mt-1 text-sm"
						value={formik.values.jabatanValue}
						onChange={formik.handleChange}
					>
						{listJabatan.map((jabatan, index) => (
							<option key={index} value={index}>
								{jabatan}
							</option>
						))}
					</FormSelect>

					<div className="w-full flex items-center justify-end gap-3">
						<Button
							text="Daftar"
							type="submit"
							onClick={() => {}}
							variant="bg-light-primary/80 hover:bg-light-primary text-light-white text-sm"
						/>
						<Button
							text="Batal"
							onClick={onClick}
							variant="bg-light-primary bg-opacity-30 text-light-primary text-sm hover:bg-opacity-50"
						/>
					</div>
				</form>
			</div>
		</section>
	);
};

export default ModalAddUser;
