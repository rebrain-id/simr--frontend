const FormSelect = (props) => {
	const { label, note, variant, children, value, name, onChange } = props;

	return (
		<div className={variant ? variant : 'w-80'}>
			<label className="text-xs font-medium">{label}</label>
			<select
				className="w-full border border-light-secondary text-sm rounded py-1 px-3"
				value={value}
				name={name}
				onChange={onChange}
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
