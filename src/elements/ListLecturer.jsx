import { useState } from 'react';
import EditDropdown from '../components/EditLecturerDropdown';

const ListLecturer = (props) => {
	const { uuid, name, email, phoneNumber, department, departmentUuid, data } =
		props;
	const [openDropdown, setOpenDropdown] = useState(false);
	const handleOpen = () => setOpenDropdown(!openDropdown);

	return (
		<>
			<div
				className={`px-5 py-3 border rounded flex items-center cursor-pointer border-light-primary hover:bg-light-primary hover:text-white transition ease-in 3s ${
					openDropdown && 'bg-light-primary text-white'
				}`}
				onClick={handleOpen}
			>
				<div className="pe-3 w-1/2">
					<h3 className="text-sm font-medium">{data}</h3>
				</div>
			</div>
			{openDropdown && (
				<EditDropdown
					uuid={uuid}
					name={name}
					email={email}
					phoneNumber={phoneNumber}
					department={department}
					departmentUuid={departmentUuid}
					close={() => setOpenDropdown(false)}
				/>
			)}
		</>
	);
};

export default ListLecturer;
