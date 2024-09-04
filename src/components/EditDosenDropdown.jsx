import Button from '../elements/Button';
import FormInput from '../elements/forms/FormInput';

const EditDosenDropdown = (props) => {
	const { data, close } = props;
	return (
		<>
			<div className="px-5 bg-white shadow-md rounded pb-4">
				<div className="w-full flex items-center w">
					<FormInput
						variant="flex items-center text-sm w-full gap-10 py-2"
						label="Nama Dosen"
						placeholder="Nama Dosen"
						labelvariant="w-1/6"
						inputvariant="w-5/6"
					/>
				</div>
				<div className="w-full flex items-center">
					<FormInput
						label="E-mail"
						placeholder="example@mail.com"
						labelvariant="w-1/6"
						inputvariant="w-5/6"
						variant="flex items-center text-sm w-full gap-10 py-2"
					/>
				</div>
				<div className="w-full flex items-center">
					<FormInput
						labelvariant="w-1/6"
						inputvariant="w-5/6"
						variant="flex items-center text-sm w-full gap-10 py-2"
						label="No. Whatsapp"
						placeholder="08*********"
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
