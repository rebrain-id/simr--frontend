import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = (props) => {
	const {
		icon,
		text,
		variant,
		iconVariant,
		onClick,
		disabled = false,
	} = props;

	return (
		<button
			className={`px-2 py-2 rounded cursor-pointer ${variant && variant}`}
			onClick={disabled ? null : onClick}
		>
			{icon && (
				<FontAwesomeIcon
					icon={icon}
					className={iconVariant ? iconVariant : 'mr-4'}
				/>
			)}
			{text}
		</button>
	);
};

export default Button;
