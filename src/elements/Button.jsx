import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = (props) => {
	const { icon, text, variant, iconVariant, onClick, type, isDisabled } =
		props;

	return (
		<button
			type={type}
			className={` ${variant && variant} px-2 py-2 rounded cursor-pointer`}
			onClick={onClick}
			disabled={isDisabled}
		>
			{icon && (
				<FontAwesomeIcon
					icon={icon}
					className={iconVariant ? iconVariant : 'mr-4'}
				/>
			)}
			<p>{text}</p>
		</button>
	);
};

export default Button;
