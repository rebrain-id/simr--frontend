const FormInputCheckbox = (props) => {
	const { text, isSelected, onClick, onChange, isRef } = props;
	const textConverted = text.replace(/\s+/g, '-').toLowerCase();

	return (
		<div className="w-full text-sm py-1 px-3 flex items-center gap-3">
			<input
				type="checkbox"
				className={`h-4 w-4 cursor-pointer`}
				ref={isRef}
				checked={isSelected}
				onChange={onChange}
				onClick={onClick}
				id={`checkbox-${textConverted}`}
			/>
			<label
				htmlFor={`checkbox-${textConverted}`}
				className="text-sm font-normal cursor-pointer"
			>
				{text}
			</label>
		</div>
	);
};

export default FormInputCheckbox;
