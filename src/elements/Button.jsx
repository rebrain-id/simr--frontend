import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = (props) => {
	const { icon, text, variant, iconVariant, onClick, type, isDisabled } =
		props;

	return (
		<button
			type={type}
			className={`px-2 py-2 rounded cursor-pointer ${variant && variant}`}
			onClick={onClick}
			disabled={isDisabled}
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
