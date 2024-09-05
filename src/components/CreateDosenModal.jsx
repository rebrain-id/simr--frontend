import { useState } from 'react';
import Button from './../elements/Button';
import Input from './../elements/forms/FormInput';

const CreateDosenModal = (props) => {
	const { close } = props;
	return (
		<>
			<div
				className={`bg-black/25 w-full h-screen fixed top-0 left-0 z-10`}
			>
				<div className="absolute px-56 rounded-lg shadow-lg right-0 top-0 transform -translate-x-1/4 translate-y-1/4 bg-white">
					<h2 className="text-2xl font-medium pb-8 pt-4">
						Tambah Data Dosen
					</h2>
					<Input
						variant="w-full pb-2"
						type="text"
						label="Nama Dosen"
						note="Wajib diisi"
						labelvariant="text-md"
						inputvariant="text-md"
						placeholder="Nama Dosen"
					/>
					<Input
						variant="w-full pb-2"
						type="email"
						label="E-mail"
						labelvariant="text-md"
						inputvariant="text-md"
						placeholder="example@mail.com"
					/>
					<Input
						variant="w-full pb-2"
						type="number"
						label="No. Whatsapp"
						labelvariant="text-md"
						inputvariant="text-md"
						placeholder="082********"
					/>
					<div className="flex items-center justify-end gap-4 py-10">
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

export default CreateDosenModal;
