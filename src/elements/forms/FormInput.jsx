import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
		isPassword = false,
	} = props;
	const [placeholderInput, setPlaceholderInput] = useState(placeholder);
	const [showPassword, setShowPassword] = useState(false);

	const handleBlur = () => {
		if (!value) {
			setPlaceholderInput(placeholder);
		}
	};

	const handleFocus = () => {
		setPlaceholderInput('');
	};

	const handleShowPassword = (e) => {
		e.preventDefault();
		setShowPassword(!showPassword);
	};

	return (
		<div className={variant ? variant : 'w-80'}>
			<div className="w-full">
				<div
					className={
						isPassword
							? 'flex justify-between items-center w-full'
							: 'w-full'
					}
				>
					<label
						className={`font-medium ${labelvariant}`}
						htmlFor={name}
					>
						{label}
					</label>

					{isPassword && (
						<div
							type="button"
							onClick={handleShowPassword}
							className="text-xs text-light-primary hover:text-primary cursor-pointer"
						>
							<FontAwesomeIcon icon={faEye} className="me-1" />
							{!showPassword
								? 'Lihat Password'
								: 'Sembunyikan Password'}
						</div>
					)}
				</div>
				<input
					name={name}
					id={name}
					type={
						isPassword && !showPassword
							? 'password'
							: isPassword && showPassword
								? 'text'
								: type
					}
					className={
						type === 'file'
							? 'border border-light-gray focus:border-light-secondary text-sm rounded pe-3 file:mr-4 file:py-1 file:px-3 file:border-0 file:text-sm file:font-normal file:bg-secondary file:bg-opacity-70 file:text-light-white hover:file:bg-opacity-100'
							: `border border-light-gray focus:border-light-secondary rounded py-1 px-3 outline-none ${inputvariant}`
					}
					{...(type === 'file' ? { accept: fileAccept } : {})}
					{...(type === 'time' ? { step: '' } : {})}
					value={value}
					placeholder={placeholderInput}
					onFocus={handleFocus}
					onBlur={handleBlur}
					onChange={onChange}
				/>
			</div>

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
