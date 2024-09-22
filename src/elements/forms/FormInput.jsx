import { useState } from 'react';

const FormInput = (props) => {
	const {
		label,
		type = 'text',
		note,
		variant,
		fileAccept,
		value,
		placeholder,
		inputvariant,
		labelvariant,
		onChange,
		name,
	} = props;
	const [placeholderInput, setPlaceholderInput] = useState(placeholder);

	const handleBlur = () => {
		if (!value) {
			setPlaceholderInput(placeholder);
		}
	};

	const handleFocus = () => {
		setPlaceholderInput('');
	};

	return (
		<div className={variant ? variant : 'w-80'}>
			<label className={`font-medium ${labelvariant}`}>{label}</label>
			<input
				name={name}
				type={type}
				className={
					type === 'file'
						? 'border border-light-secondary text-sm rounded  pe-3 file:mr-4 file:py-1 file:px-3 file:border-0 file:text-sm file:font-normal file:bg-secondary file:bg-opacity-70 file:text-light-white hover:file:bg-opacity-100'
						: `border border-light-secondary rounded py-1 px-3 outline-none ${inputvariant}`
				}
				{...(type === 'file' ? { accept: fileAccept } : {})}
				value={value}
				placeholder={placeholderInput}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onChange={onChange}
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
