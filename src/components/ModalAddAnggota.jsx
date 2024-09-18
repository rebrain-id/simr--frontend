import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormCheckbox from '../elements/forms/FormCheckbox';
import FormInputCheckbox from '../elements/forms/FormInputCheckbox';
import Button from '../elements/Button';
import { useRef, useState } from 'react';

const ModalAddAnggota = ({ onClick }) => {
	const [checkAll, setCheckAll] = useState(false);
	const [checkboxStates, setCheckboxStates] = useState({});
	let checkboxRefs = useRef([]);

	const handleCheckAll = () => {
		const newCheckAll = !checkAll;
		setCheckAll(newCheckAll);

		checkboxRefs.current.forEach((checkbox) => {
			if (checkbox) {
				checkbox.checked = newCheckAll;
			}
		});

		const newCheckboxStates = checkboxRefs.current.reduce(
			(acc, checkbox, index) => {
				acc[index] = newCheckAll;
				return acc;
			},
			{},
		);

		setCheckboxStates(newCheckboxStates);
	};

	const handleCheckboxChange = (index) => {
		const updatedCheckboxStates = {
			...checkboxStates,
			[index]: !checkboxStates[index],
		};
		setCheckboxStates(updatedCheckboxStates);

		const allChecked = Object.values(updatedCheckboxStates).every(
			(value) => value,
		);
		setCheckAll(allChecked);
	};

	const addRefs = (el, index) => {
		if (el && !checkboxRefs.current.includes(el)) {
			checkboxRefs.current[index] = el;
		}
	};

	const handleCloseModal = (e) => {
		if (e.target === e.currentTarget) {
			onClick();
		}
	};

	return (
		<div
			onClick={handleCloseModal}
			className="fixed top-0 left-0 w-full min-h-screen h-full z-20 bg-light-secondary bg-opacity-10 flex items-center justify-center"
		>
			<div className="bg-light-white p-5 rounded w-1/2 shadow-md">
				<div className="w-full flex items-center justify-between mb-5">
					<h1 className="font-semibold">Tambah Anggota</h1>
					<FontAwesomeIcon
						icon={faXmark}
						onClick={onClick}
						className="cursor-pointer"
					/>
				</div>

				<div>
					<FormCheckbox variant="w-full">
						<FormInputCheckbox
							text="Pilih Semua"
							onClick={handleCheckAll}
							isSelected={checkAll}
						/>
						{[
							'Teknik Informatika',
							'Teknik Sipil',
							'Teknik Mesin',
							'Teknik Elektro',
							'Teknik Lingkungan',
							'Sistem Informasi',
						].map((item, index) => (
							<FormInputCheckbox
								text={item}
								isRef={(el) => addRefs(el, index)}
								key={index}
								onChange={() => handleCheckboxChange(index)}
								isSelected={checkboxStates[index] || checkAll}
							/>
						))}
					</FormCheckbox>

					<div className="flex justify-end items-center gap-2 mt-3">
						<Button
							text="Cek Agenda"
							variant="bg-light-primary bg-opacity-30 text-light-primary text-sm hover:bg-opacity-50"
						/>
						<Button
							text="Simpan Anggota"
							variant="bg-light-primary bg-opacity-90 text-light-white text-sm hover:bg-opacity-100"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalAddAnggota;
