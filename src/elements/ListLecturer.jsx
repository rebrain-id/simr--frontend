import { useState } from 'react';
import EditDropdown from '../components/EditLecturerDropdown';

const ListLecturer = (props) => {
	const { uuid, name, email, phoneNumber, department, departmentUuid, data } =
		props;
	const dispatch = useDispatch();
	const [isVisible, setIsVisible] = useState(false);
	const handleOpen = () => setIsVisible(!isVisible);

	const handleDropdown = () => {};
	return (
		<>
			<div
				className={`px-5 py-3 border rounded flex items-center cursor-pointer border-light-primary hover:bg-light-primary hover:text-white transition ease-in 3s ${
					isVisible && 'bg-light-primary text-white'
				}`}
				onClick={handleOpen}
			>
				<div className="pe-3 w-1/2">
					<h3 className="text-sm font-medium">{data}</h3>
				</div>
			</div>
			{isVisible && (
				<EditDropdown
					isVisible="px-5 bg-white shadow-md rounded pb-4 h-full"
					uuid={uuid}
					name={name}
					email={email}
					phoneNumber={phoneNumber}
					department={department}
					departmentUuid={departmentUuid}
					close={() => setIsVisible(false)}
				/>
			)}
		</>
	);
};

export default ListLecturer;
