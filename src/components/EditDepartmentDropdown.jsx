import { useState } from 'react';
import Button from '../elements/Button';
import FormInput from '../elements/forms/FormInput';

const EditDepartmentDropdown = (props) => {
	const { name, username, password, close } = props;

	const [form, setForm] = useState({
		name: name,
		username: username,
		password: password,
	});

	const handleForm = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};
	return (
		<>
			<div className="px-5 bg-white shadow-md rounded pb-4">
				<div className="w-full flex items-center">
					<FormInput
						name={name}
						type="text"
						variant="flex items-center text-sm w-full gap-10 py-2"
						label="Nama Program Studi"
						placeholder="Nama Program Studi"
						labelvariant="w-1/5"
						inputvariant="w-5/6"
						value={form.name}
						onChange={handleForm}
					/>
				</div>
				<div className="w-full flex items-center">
					<FormInput
						name={username}
						type="text"
						variant="flex items-center text-sm w-full gap-10 py-2"
						label="Username"
						placeholder="Username"
						labelvariant="w-1/5"
						inputvariant="w-5/6"
						value={form.username}
						onChange={handleForm}
					/>
				</div>
				<div className="w-full flex items-center">
					<FormInput
						name={password}
						type="password"
						variant="flex items-center text-sm w-full gap-10 py-2"
						label="Password"
						placeholder="*********"
						labelvariant="w-1/5"
						inputvariant="w-5/6"
						value={form.password}
						onChange={handleForm}
					/>
				</div>
				<div className="flex items-center gap-8">
					<Button
						text="Update"
						variant="bg-light-primary text-white rounded text-sm hover:bg-primary transition ease-in 3s"
					/>
					<Button
						text="Batal"
						variant="bg-light-primary/25 text-primary rounded text-sm hover:bg-danger hover:text-white transition ease-in 3s"
						onClick={close}
					/>
				</div>
			</div>
		</>
	);
};

export default EditDepartmentDropdown;
