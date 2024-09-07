import { useState } from 'react';
import Button from '../elements/Button';
import FormInput from '../elements/forms/FormInput';

const EditDosenDropdown = (props) => {
	const { uuid, name, email, no, close } = props;

	const [formProduct, setFormProduct] = useState({
		name: name,
		email: email,
		no: no,
	});

	const handleFormProduct = (e) => {
		setFormProduct({ ...formProduct, [e.target.name]: e.target.value });
	};
	return (
		<>
			<div className="px-5 bg-white shadow-md rounded pb-4">
				<div className="w-full flex items-center w">
					<FormInput
						name="name"
						variant="flex items-center text-sm w-full gap-10 py-2"
						label="Nama Dosen"
						placeholder="Nama Dosen"
						labelvariant="w-1/6"
						inputvariant="w-5/6"
						value={formProduct.name}
						onChange={handleFormProduct}
					/>
				</div>
				<div className="w-full flex items-center">
					<FormInput
						name="email"
						label="E-mail"
						placeholder="example@mail.com"
						labelvariant="w-1/6"
						inputvariant="w-5/6"
						variant="flex items-center text-sm w-full gap-10 py-2"
						value={formProduct.email}
						onChange={handleFormProduct}
					/>
				</div>
				<div className="w-full flex items-center">
					<FormInput
						name="phoneNumber"
						labelvariant="w-1/6"
						inputvariant="w-5/6"
						variant="flex items-center text-sm w-full gap-10 py-2"
						label="No. Whatsapp"
						placeholder="08*********"
						value={formProduct.no}
						onChange={handleFormProduct}
					/>
				</div>
				<div className="flex items-center gap-8">
					<Button
						text="Update"
						variant="bg-light-primary text-white rounded text-sm"
					/>
					<Button
						text="Batal"
						variant="bg-light-primary/25 text-primary rounded text-sm"
						onClick={close}
					/>
				</div>
			</div>
		</>
	);
};

export default EditDosenDropdown;
