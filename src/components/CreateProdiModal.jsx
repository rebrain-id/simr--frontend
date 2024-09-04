import { useState } from 'react';
import Button from './../elements/Button';
import Input from './../elements/forms/FormInput';

const CreateProdiModal = (props) => {
	const { close } = props;
	return (
		<>
			<div
				className={`bg-black/25 w-full h-screen fixed top-0 left-0 z-10`}
			>
				<div className="absolute px-56 rounded-lg shadow-lg right-0 top-0 transform -translate-x-1/4 translate-y-1/4 bg-white">
					<h2 className="text-2xl font-medium pb-8 pt-4">
						Tambah Data Program Studi
					</h2>
					<Input
						variant="w-full pb-2"
						type="text"
						label="Nama Program Studi"
						note="Wajib diisi"
						labelvariant="text-md"
						inputvariant="text-md"
						placeholder="Nama Program Studi"
					/>
					<Input
						variant="w-full pb-2"
						type="text"
						label="Username"
						note="Wajib diisi"
						labelvariant="text-md"
						inputvariant="text-md"
						placeholder="Username"
					/>
					<Input
						variant="w-full pb-2"
						type="password"
						label="Password"
						note="Wajib diisi"
						labelvariant="text-md"
						inputvariant="text-md"
						placeholder="*********"
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

export default CreateProdiModal;
