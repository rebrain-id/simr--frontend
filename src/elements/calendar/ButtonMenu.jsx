import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ButtonMenu = (props) => {
	const { icon, text, variant, iconVariant, onClick } = props;

	return (
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
	);
};

export default ButtonMenu;
