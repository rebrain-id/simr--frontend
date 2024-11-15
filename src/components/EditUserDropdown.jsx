import { useState } from 'react';
import Button from '../elements/Button';
import FormSelect from '../elements/forms/FormSelect';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { openModal, updateDataUser } from '../redux/actions/authAction';

const EditUserDropdown = (props) => {
	const { data, department } = props;
	const [openDropdown, setOpenDropdown] = useState(false);
	const dispatch = useDispatch();

	const handleOpen = () => setOpenDropdown(!openDropdown);

	const listJabatan = [
		'Pilih Jabatan',
		'Dekan',
		'Wakil Dekan',
		'Pengajaran',
		'Ketua Program Studi',
		'Sekretaris Program Studi',
	];

	const formik = useFormik({
		initialValues: {
			departmentUuid: data.department.uuid || '',
			jabatanValue: data.jabatanValue || '',
		},

		// onSubmit: (values) => {
		// 	console.log(values);
		// 	dispatch(updateDataUser(data.username, values));
		// },
	});

	return (
		<>
			<div
				className={`px-5 py-3 ms-8 border rounded flex items-center justify-between cursor-pointer border-light-primary hover:bg-light-primary hover:text-white transition ease-in 3s  ${
					openDropdown && 'bg-light-primary text-white'
				}`}
				onClick={handleOpen}
			>
				<div className="">
					<h3 className="text-sm font-medium">{data.username}</h3>
				</div>

				<div className="py-1 px-2 text-dark-secondary uppercase font-semibold bg-light-white rounded">
					<h3 className="text-xs">
						{listJabatan[data.jabatanValue]}
					</h3>
				</div>
			</div>

			{openDropdown && (
				<div
					className={`transition-[height] duration-300 pb-5 bg-white drop-shadow-bottom rounded p-5 ms-8`}
				>
					<form
						onSubmit={formik.handleSubmit}
						className="flex flex-col gap-3"
					>
						<FormSelect
							variant="flex flex-col w-full"
							name="departmentUuid"
							label="Program Studi"
							labelVariant="w-full text-xs"
							selectVariant="w-full mt-1 text-sm"
							value={formik.values.departmentUuid}
							onChange={formik.handleChange}
							disabled
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
							disabled
						>
							{listJabatan.map((jabatan, index) => (
								<option key={index} value={Number(index)}>
									{jabatan}
								</option>
							))}
						</FormSelect>
						<div className="flex items-center justify-end gap-3">
							{/* <div className="flex items-center w-full"> */}
							{/* <Button
									type="submit"
									text="Update"
									variant="bg-light-primary text-white rounded text-sm hover:bg-primary transition ease-in 3s"
								/> */}
							<Button
								text="Batal"
								type="button"
								variant="bg-light-primary/25 text-primary rounded text-sm hover:bg-danger hover:text-white transition ease-in 3s"
								onClick={handleOpen}
							/>
							{/* <Button
								onClick={() =>
									dispatch(openModal(data.username))
								}
								text="Hapus"
								variant="bg-light-danger text-white rounded text-sm hover:bg-danger hover:text-white transition ease-in 3s"
							/> */}
							{/* </div> */}
						</div>
					</form>
				</div>
			)}
		</>
	);
};

export default EditUserDropdown;
