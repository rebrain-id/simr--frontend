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
		lecturer,
	} = props;
	const [isOpenLecturer, setIsVisible] = useState(false);
	const [isOpenEdit, setIsOpenEdit] = useState('');
	const handleOpenLecturer = () => setIsVisible(!isOpenLecturer);
	const handleOpenEdit = (uuid) => setIsOpenEdit(uuid);
	const handleCloseEdit = () => setIsOpenEdit(null);

	return (
		<>
			<div
				k
				className={`mx-5 px-5 py-3 border rounded flex items-center cursor-pointer border-light-primary hover:bg-light-primary hover:text-white transition ease-in 3s ${
					isOpenLecturer && 'bg-light-primary text-white'
				}`}
				onClick={handleOpenLecturer}
			>
				<h2 className="text-sm font-medium">{dep}</h2>
			</div>
			{isOpenLecturer &&
				lecturer?.map((item) => (
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
								key={item.uuid}
								uuid={item.uuid}
								name={item.name}
								email={item.email}
								phoneNumber={item.phoneNumber}
								department={item.department.name}
								departmentUuid={item.department.uuid}
								close={() => handleCloseEdit(null)}
							/>
						)}
					</>
				))}
		</>
	);
};

export default ListLecturer;
