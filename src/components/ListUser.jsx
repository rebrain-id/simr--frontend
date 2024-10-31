import { useState } from 'react';
import EditUserDropdown from './EditUserDropdown';

const ListUser = (props) => {
	const { data, department } = props;
	const [openDropdown, setOpenDropdown] = useState(false);

	const handleOpen = () => setOpenDropdown(!openDropdown);

	return (
		<>
			<div
				className={`px-5 py-3 border rounded flex items-center cursor-pointer border-light-primary hover:bg-light-primary hover:text-white transition ease-in 3s  ${
					openDropdown && 'bg-light-primary text-white'
				}`}
				onClick={handleOpen}
			>
				<div className="pe-3 w-1/2">
					<h3 className="text-sm font-medium">{data.department}</h3>
				</div>
			</div>

			{openDropdown && (
				<div className="flex flex-col gap-3">
					{data.user.map((item) => (
						<EditUserDropdown
							key={item.uuid}
							data={item}
							department={department}
						/>
					))}
				</div>
			)}
		</>
	);
};

export default ListUser;
