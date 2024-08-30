import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const NavLink = (props) => {
	const { icon, title, to } = props;

	return (
		<Link to={to} className="flex gap-3 items-center text-secondary p-2 rounded-md hover:bg-light-primary hover:text-light-white cursor-pointer">
			<FontAwesomeIcon icon={icon} className="h-5" />
			<p className="text-md font-semibold">{title}</p>
		</Link>
	);
};

export default NavLink;
