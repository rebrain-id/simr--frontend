const FormTextarea = (props) => {
	const { label, note, variant, rows = 5, value, name, onChange } = props;

	return (
		<div className={variant ? variant : 'w-80'}>
			<label className="text-xs font-medium">{label}</label>
			<textarea
				className="w-full border border-light-gray focus:border-light-secondary outline-none text-sm rounded pt-1 pb-3 px-3 resize-none"
				rows={rows}
				value={value}
				name={name}
				onChange={onChange}
			></textarea>

			{note && (
				<p className="text-xs font-light text-light-secondary">
					<span className="text-danger font-semibold me-1">*</span>
					{note}
				</p>
			)}
		</div>
	);
};

export default FormTextarea;
