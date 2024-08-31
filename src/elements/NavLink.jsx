import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const NavLink = (props) => {
	const { icon, title, to, variant, textVariant, iconVariant } = props;

	return (
		<Link
			to={to}
			className={`flex gap-3 items-center text-secondary p-2 rounded-md hover:bg-light-primary hover:text-light-white cursor-pointer ${variant ? variant : ''}`}
		>
			<FontAwesomeIcon
				icon={icon}
				className={iconVariant ? iconVariant : 'h-5'}
			/>
			<p className={textVariant ? textVariant : `text-md font-semibold`}>
				{title}
			</p>
		</Link>
	);
};

export default NavLink;
