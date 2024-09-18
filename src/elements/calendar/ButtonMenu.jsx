import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const ButtonMenu = (props) => {
	const { icon, text, variant, iconVariant, onClick, link } = props;

	return (
		<>
			{!link ? (
				<button
					onClick={onClick}
					className={`border-light-primary py-2 px-3 text-sm text-light-primary hover:bg-light-primary hover:text-light-white ${variant}`}
				>
					{icon && (
						<FontAwesomeIcon
							icon={icon}
							className={iconVariant ? iconVariant : 'mr-2'}
						/>
					)}
					{text}
				</button>
			) : (
				<Link
					to={link}
					className={`border-light-primary py-2 px-3 text-sm text-light-primary hover:bg-light-primary hover:text-light-white ${variant}`}
				>
					{icon && (
						<FontAwesomeIcon
							icon={icon}
							className={iconVariant ? iconVariant : 'mr-2'}
						/>
					)}
					{text}
				</Link>
			)}
		</>
	);
};

export default ButtonMenu;
