const FormInput = (props) => {
	const { label, type = 'text', note, variant, fileAccept, value } = props;

	return (
		<div className={variant ? variant : 'w-80'}>
			<label className="text-xs font-medium">{label}</label>
			<input
				type={type}
				className={
					type === 'file'
						? 'w-full border border-light-secondary text-sm rounded  pe-3 file:mr-4 file:py-1 file:px-3 file:border-0 file:text-sm file:font-normal file:bg-secondary file:bg-opacity-70 file:text-light-white hover:file:bg-opacity-100'
						: 'w-full border border-light-secondary text-sm rounded py-1 px-3'
				}
				{...(type === 'file' ? { accept: fileAccept } : {})}
				value={value}
			/>

			{note && (
				<p className="text-[10px] font-light text-light-secondary">
					<span className="text-danger font-semibold me-1">*</span>
					{note}
				</p>
			)}
		</div>
	);
};

export default FormInput;
