import Button from '../elements/Button';

const EditDropdown = (props) => {
	const { data, close } = props;
	return (
		<>
			<div className="px-5 bg-white shadow-md rounded pb-4">
				<div className="flex items-center gap-4 text-xs py-2">
					<p>Nama</p>
					<input
						type="text"
						className="w-full outline-none rounded border border-b-gray-200 py-2 pl-2"
						placeholder="Nama Dosen"
						value={data ? data.nama : ''}
					/>
				</div>
				<div className="flex items-center gap-10 text-xs pb-2">
					<p>E-mail</p>
					<input
						type="email"
						className="w-full outline-none rounded border border-b-gray-200 py-2 pl-2"
						placeholder="E-mail"
						value={data ? data.email : ''}
					/>
				</div>
				<div className="flex items-center gap-10 text-xs pb-2">
					<p>No. Whatsapp</p>
					<input
						type="number"
						className="w-full outline-none rounded border border-b-gray-200 py-2 pl-2"
						placeholder="082********"
						value={data ? data.no : ''}
					/>
				</div>
				<div className="flex items-center gap-4">
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

export default EditDropdown;
