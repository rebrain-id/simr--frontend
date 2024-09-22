const FormSelect = (props) => {
	const {
		name,
		label,
		note,
		variant,
		selectVariant,
		labelVariant,
		onChange,
		value,
		children,
	} = props;

	return (
		<div className={variant ? variant : 'w-80'}>
			<label className={`font-medium ${labelVariant}`}>{label}</label>
			<select
				name={name}
				className={`w-full border border-light-secondary rounded py-1 px-3 ${selectVariant}`}
				onChange={onChange}
				value={value}
			>
				{children}
			</select>

			{note && (
				<p className="text-xs font-light text-light-secondary">
					<span className="text-danger font-semibold me-1">*</span>
					{note}
				</p>
			)}
		</div>
	);
};

export default FormSelect;
