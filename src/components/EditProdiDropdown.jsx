import Button from '../elements/Button';
import FormInput from '../elements/forms/FormInput';

const EditProdiDropdown = (props) => {
	const { data, close } = props;
	return (
		<>
			<div className="px-5 bg-white shadow-md rounded pb-4">
				<div className="w-full flex items-center">
					<FormInput
						type="text"
						variant="flex items-center text-sm w-full gap-10 py-2"
						label="Nama Program Studi"
						placeholder="Nama Program Studi"
						labelvariant="w-1/5"
						inputvariant="w-5/6"
					/>
				</div>
				<div className="w-full flex items-center">
					<FormInput
						type="text"
						variant="flex items-center text-sm w-full gap-10 py-2"
						label="Username"
						placeholder="Username"
						labelvariant="w-1/5"
						inputvariant="w-5/6"
					/>
				</div>
				<div className="w-full flex items-center">
					<FormInput
						type="password"
						variant="flex items-center text-sm w-full gap-10 py-2"
						label="Password"
						placeholder="*********"
						labelvariant="w-1/5"
						inputvariant="w-5/6"
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

export default EditProdiDropdown;
