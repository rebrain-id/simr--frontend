import { useState } from 'react';
import Button from '../elements/Button';
import FormInput from '../elements/forms/FormInput';

const CreateLecturerModal = (props) => {
	const { close } = props;
	return (
		<>
			<div
				className={`bg-black/25 h-screen fixed top-0 left-0 right-0 bottom-0 z-10`}
			>
				<div className="absolute w-1/2 px-8 rounded-lg shadow-lg right-0 top-0 transform -translate-x-1/2 translate-y-1/4 z-10  bg-white">
					<h2 className="text-2xl font-medium pb-8 py-2">
						Tambah Data Dosen
					</h2>
					<FormInput
						variant="flex flex-col"
						type="text"
						label="Nama Dosen"
						note="Wajib diisi"
						labelvariant="text-md pb-2"
						inputvariant="text-md"
						placeholder="Nama Dosen"
					/>
					<FormInput
						variant="flex flex-col "
						type="email"
						label="E-mail"
						note="Wajib diisi"
						labelvariant="text-md py-2"
						inputvariant="text-md"
						placeholder="example@mail.com"
					/>
					<FormInput
						variant="flex flex-col "
						type="number"
						label="No. Whatsapp"
						note="Wajib diisi"
						labelvariant="text-md py-2"
						inputvariant="text-md"
						placeholder="082********"
					/>
					<div className="flex items-center justify-end gap-4 pb-10">
						<Button
							text="Simpan"
							variant="bg-light-primary text-white rounded text-sm hover:bg-primary transition-all ease-in 3s"
						/>
						<Button
							text="Batal"
							variant="bg-light-secondary/25 text-light-primary rounded text-sm hover:bg-danger hover:text-white transition-all ease-in 3s"
							onClick={close}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default CreateLecturerModal;
