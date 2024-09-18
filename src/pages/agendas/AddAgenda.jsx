import { useEffect, useState } from 'react';
import ModalAddAnggota from '../../components/ModalAddAnggota';
import Button from '../../elements/Button';
import FormInput from '../../elements/forms/FormInput';
import FormSelect from '../../elements/forms/FormSelect';
import FormTextarea from '../../elements/forms/FormTextarea';

const AddAgenda = () => {
	const [openModal, setOpenModal] = useState(false);

	const handleOpenModal = () => {
		setOpenModal(!openModal);
	};

	useEffect(() => {
		if (openModal) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	});

	return (
		<>
			{openModal && <ModalAddAnggota onClick={handleOpenModal} />}
			<div
				className={`bg-white px-10 py-5 rounded drop-shadow-bottom mt-5`}
			>
				<h1 className="text-lg font-semibold mb-5">Tambah Agenda</h1>

				<section className="flex flex-col gap-3 mt-5 w-full">
					<FormInput
						variant="w-full"
						inputvariant="text-sm font-normal"
						labelvariant="text-xs"
						label="Agenda"
						placeholder="Judul agenda"
					/>
					<div className="flex gap-5">
						<FormInput
							variant="w-full"
							inputvariant="text-sm font-normal"
							labelvariant="text-xs"
							label="Dari"
							type="datetime-local"
						/>
						<FormInput
							variant="w-full"
							inputvariant="text-sm font-normal"
							labelvariant="text-xs"
							label="Sampai"
							type="datetime-local"
						/>
					</div>
					<div className="flex gap-5 w-full">
						<div className="flex flex-col gap-3 w-1/2">
							<FormInput
								variant="w-full"
								inputvariant="text-sm font-normal"
								labelvariant="text-xs"
								label="Tempat"
							/>
							<FormSelect label="Kategori" variant="w-full">
								<option
									value=""
									className="text-light-secondary"
								>
									Pilih jenis agenda
								</option>
								{['Agenda Internal', 'Agenda Eksternal'].map(
									(item, index) => (
										<option
											value=""
											className="text-secondary"
											key={index}
										>
											{item}
										</option>
									),
								)}
							</FormSelect>
						</div>
						<FormTextarea
							label="Deskripsi"
							variant="w-1/2"
							rows={4}
						/>
					</div>

					<div className="mt-5 flex items-center justify-between">
						<Button
							onClick={handleOpenModal}
							text="Tambah Anggota"
							variant="bg-light-primary bg-opacity-80 text-light-white text-sm hover:bg-opacity-100"
						/>
						<div className="flex items-center gap-2">
							<Button
								text="Simpan"
								variant="bg-light-primary bg-opacity-90 text-light-white text-sm hover:bg-opacity-100"
							/>
							<Button
								text="Batal"
								variant="bg-light-primary bg-opacity-30 text-light-primary text-sm hover:bg-opacity-50"
							/>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default AddAgenda;
