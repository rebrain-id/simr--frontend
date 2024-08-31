const FormTextarea = (props) => {
	const { label, note, variant } = props;

	return (
		<div className={variant ? variant : 'w-80'}>
			<label className="text-xs font-medium">{label}</label>
			<textarea
				className="w-full border border-light-secondary text-sm rounded py-1 px-3 resize-none"
				rows={5}
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
