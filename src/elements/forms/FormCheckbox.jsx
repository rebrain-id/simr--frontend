const FormCheckbox = (props) => {
	const { label, note, variant, children } = props;

	return (
		<div className={variant ? variant : 'w-80'}>
			<label className="text-xs font-medium">{label}</label>
			{children}

			{note && (
				<p className="text-xs font-light text-light-secondary">
					<span className="text-danger font-semibold me-1">*</span>
					{note}
				</p>
			)}
		</div>
	);
};

export default FormCheckbox;
