import { faFilter } from '@fortawesome/free-solid-svg-icons';
import ButtonMenu from '../elements/calendar/ButtonMenu';
import FormInput from '../elements/forms/FormInput';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormCheckbox from '../elements/forms/FormCheckbox';
import FormInputCheckbox from '../elements/forms/FormInputCheckbox';

const FilterDropdown = (props) => {
	const { typeAgenda } = props;
	const navigate = useNavigate();

	const [inputValue, setInputValue] = useState({
		from: '',
		to: '',
		type:
			typeAgenda && typeAgenda == 'all'
				? ['Internal', 'Eksternal']
				: ['Internal'],
	});

	const handleInputValue = (e) => {
		const { name, type, value, checked } = e.target;

		if (type === 'checkbox') {
			setInputValue((prev) => ({
				...prev,
				type: checked
					? [...prev.type, value]
					: prev.type.filter((item) => item !== value),
			}));
		} else {
			setInputValue((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	return (
		<div className="p-3 bg-white rounded border drop-shadow w-2/5 absolute z-30">
			<FormInput
				inputvariant="text-sm font-normal mb-3"
				labelvariant="text-xs"
				variant="w-full"
				label="Dari"
				type="date"
				name="from"
				onChange={handleInputValue}
			/>
			<FormInput
				inputvariant="text-sm font-normal mb-3"
				labelvariant="text-xs"
				variant="w-full"
				label="Sampai"
				type="date"
				name="to"
				onChange={handleInputValue}
			/>
			<FormCheckbox>
				<FormInputCheckbox
					text={'Rapat Internal'}
					variant={'px-0'}
					checkboxVariant={'w-3 h-3'}
					labelVariant={'text-sm font-normal -ms-1'}
					value="Internal"
					isSelected={inputValue.type.includes('Internal')}
					onChange={handleInputValue}
					name="type"
				/>
				<FormInputCheckbox
					text={'Rapat Eksternal'}
					variant={'px-0'}
					checkboxVariant={'w-3 h-3'}
					labelVariant={'text-sm font-normal -ms-1'}
					value="Eksternal"
					isSelected={inputValue.type.includes('Eksternal')}
					onChange={handleInputValue}
					name="type"
				/>
			</FormCheckbox>

			<div className="flex justify-end">
				<ButtonMenu
					icon={faFilter}
					text="Filter"
					variant={`rounded-md bg-light-primary bg-opacity-90 text-white font-medium text-sm hover:bg-opacity-100`}
					onClick={() =>
						navigate(
							`/agenda?menu=history&from=${inputValue.from}&to=${inputValue.to}&type=${inputValue.type.length > 1 ? 'all' : inputValue.type[0]}`,
						)
					}
				/>
			</div>
		</div>
	);
};

export default FilterDropdown;
