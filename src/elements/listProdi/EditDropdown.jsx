import Button from '../../elements/Button';

const EditDropdown = () => {
	return (
		<>
			<div className="px-5 bg-white shadow-md rounded pb-4">
				<div className="flex items-center gap-4 text-xs py-2">
					{[]}
					<p>Nama Program Studi</p>
					<input
						type="text"
						className="w-full outline-none rounded border border-b-gray-200 py-2 pl-2"
						placeholder="Nama Prodi"
					/>
				</div>
				<div className="flex items-center gap-4 text-xs pb-2">
					<p>Username</p>
					<input
						type="text"
						className="w-full outline-none rounded border border-b-gray-200 py-2 pl-2"
						placeholder="Username"
					/>
				</div>
				<div className="flex items-center gap-4 text-xs pb-2">
					<p>Password</p>
					<input
						type="password"
						className="w-full outline-none rounded border border-b-gray-200 py-2 pl-2"
						placeholder="*******"
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
					/>
				</div>
			</div>
		</>
	);
};

export default EditDropdown;
