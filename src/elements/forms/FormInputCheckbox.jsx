import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useState } from 'react';

const FormInputCheckbox = (props) => {
	const {
		text,
		isSelected,
		onClick,
		onChange,
		isRef,
		data,
		variant,
		checkboxVariant,
		labelVariant,
		value,
		name,
		onSelect,
	} = props;
	const [openPopover, setOpenPopover] = useState(false);
	const textConverted = text.replace(/\s+/g, '-').toLowerCase();

	const handleOpenPopover = () => {
		setOpenPopover(true);
	};

	const handleClosePopover = () => {
		setOpenPopover(false);
	};

	return (
		<div
			className={`w-full text-sm py-1 flex items-center justify-between ${variant ? variant : 'px-3'}`}
		>
			<div className="flex items-center gap-3">
				<input
					type="checkbox"
					className={`h-4 w-4 cursor-pointer ${checkboxVariant}`}
					ref={isRef}
					checked={isSelected}
					onChange={onChange}
					onClick={onClick}
					id={`checkbox-${textConverted}`}
					value={value}
					name={name}
					onSelect={onSelect}
				/>
				<label
					htmlFor={`checkbox-${textConverted}`}
					className={`cursor-pointer ${labelVariant ? labelVariant : 'text-sm font-normal'}`}
				>
					{text}
				</label>
			</div>
			{data && (
				<div className="relative flex">
					<div
						className="h-5 w-5 rounded-full bg-light-danger opacity-70 hover:bg-opacity-100 flex items-center justify-center cursor-pointer"
						onMouseEnter={handleOpenPopover}
						onMouseLeave={handleClosePopover}
					>
						<FontAwesomeIcon
							icon={faExclamation}
							className="h-3 text-light-white"
						/>
					</div>

					{openPopover && (
						<div className="absolute top-5 py-2 px-3 bg-light-white drop-shadow-right-bottom rounded shadow-lg z-10 w-72 text-secondary text-xs">
							<div className="absolute left-1 -top-1 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-light-white"></div>

							<p className="font-medium text-xs mb-3">
								{data && data[0].detailAgenda.titleAgenda}
							</p>

							<p>
								Jadwal :{' '}
								{moment.utc(data[0].start).format('HH:mm')} -{' '}
								{moment.utc(data[0].finish).format('HH:mm')} WIB
							</p>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default FormInputCheckbox;
