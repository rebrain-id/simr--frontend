import { useState } from 'react';
import EditDropdown from '../components/EditLecturerDropdown';

const ListLecturer = (props) => {
	const {
		uuid,
		name,
		email,
		phoneNumber,
		department,
		departmentUuid,
		dep,
		data,
	} = props;
	const [isOpenLecturer, setIsVisible] = useState(false);
	const [isOpenEdit, setIsOpenEdit] = useState('');
	const handleOpenLecturer = () => setIsVisible(!isOpenLecturer);
	const handleOpenEdit = (uuid) => setIsOpenEdit(uuid);
	const handleCloseEdit = () => setIsOpenEdit('');

	return (
		<>
			<div
				className={`mx-5 px-5 py-3 border rounded flex items-center cursor-pointer border-light-primary hover:bg-light-primary hover:text-white transition ease-in 3s ${
					isOpenLecturer && 'bg-light-primary text-white'
				}`}
				onClick={handleOpenLecturer}
			>
				<h2 className="text-sm font-medium">{dep}</h2>
			</div>
			{isOpenLecturer &&
				data?.map((item) => (
					<>
						<div
							key={item.uuid}
							className={`mx-8 px-5 py-3 border rounded flex items-center cursor-pointer border-light-primary hover:bg-light-primary hover:text-white transition ease-in 3s ${
								isOpenEdit === item.uuid
									? 'bg-light-primary text-white'
									: ''
							}`}
							onClick={() => handleOpenEdit(item.uuid)}
						>
							<div className="pe-3 w-1/2">
								<h3 className="text-sm font-medium">
									{item.name}
								</h3>
							</div>
						</div>
						{isOpenEdit === item.uuid && (
							<EditDropdown
								isOpenEdit="px-5 bg-white shadow-md rounded pb-4 h-full"
								uuid={uuid}
								name={name}
								email={email}
								phoneNumber={phoneNumber}
								department={department}
								departmentUuid={departmentUuid}
								close={() => handleCloseEdit(null)}
							/>
						)}
					</>
				))}
		</>
	);
};

export default ListLecturer;
