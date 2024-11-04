import { faFilter } from '@fortawesome/free-solid-svg-icons';
import ButtonMenu from '../elements/calendar/ButtonMenu';
import FormInput from '../elements/forms/FormInput';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormCheckbox from '../elements/forms/FormCheckbox';
import FormInputCheckbox from '../elements/forms/FormInputCheckbox';
import moment from 'moment';

const FilterDropdown = (props) => {
	const { typeAgenda, typeAgendas = [], dateFrom, dateTo } = props;
	const navigate = useNavigate();

	const initialTypeAgenda =
		typeAgenda !== 'null' ? typeAgenda.split(',') : [];

	const [inputValue, setInputValue] = useState({
		from: dateFrom ? moment(dateFrom).format('YYYY-MM-DD') : '2020-01-01',
		to: dateTo
			? moment(dateTo).format('YYYY-MM-DD')
			: moment().subtract(1, 'days').format('YYYY-MM-DD'),
		type:
			initialTypeAgenda.length > 0
				? initialTypeAgenda
				: typeAgendas.length > 0
					? [typeAgendas[0].uuid]
					: [],
	});

	const handleInputValue = (e) => {
		const { name, type, value, checked } = e.target;

		setInputValue((prev) => {
			if (type === 'checkbox') {
				const updatedType = checked
					? [...new Set([...prev.type, value])]
					: prev.type.filter((item) => item !== value);
				return {
					...prev,
					[name]: updatedType,
				};
			} else {
				return {
					...prev,
					[name]: value,
				};
			}
		});
	};

	const handleFilterClick = () => {
		const fromDate =
			inputValue.from !== 'Invalid date' ? inputValue.from : '2020-01-01';
		const toDate =
			inputValue.to !== 'Invalid date'
				? inputValue.to
				: moment().subtract(1, 'days').format('YYYY-MM-DD');
		const types = inputValue.type.join(',');

		navigate(
			`/agenda?menu=history&from=${fromDate}&to=${toDate}&type=${types}`,
		);
	};

	return (
		<div className="p-3 bg-white rounded border drop-shadow w-1/8 absolute z-30">
			<FormInput
				inputvariant="text-sm font-normal mb-3 w-full"
				labelvariant="text-xs w-1/3"
				variant="flex justify-center items-center w-80"
				label="Dari"
				type="date"
				name="from"
				onChange={handleInputValue}
				value={inputValue.from}
			/>
			<FormInput
				inputvariant="text-sm font-normal mb-3 w-full"
				labelvariant="text-xs w-1/3"
				variant="flex justify-center items-center w-80"
				label="Sampai"
				type="date"
				name="to"
				onChange={handleInputValue}
				value={inputValue.to}
			/>
			<FormCheckbox>
				{typeAgendas.map((item, index) => (
					<FormInputCheckbox
						key={index}
						text={item.name}
						variant="px-0"
						checkboxVariant="w-3 h-3"
						labelVariant="text-sm font-normal ms-1"
						value={item.uuid}
						onChange={handleInputValue}
						isSelected={inputValue.type.includes(item.uuid)}
						name="type"
					/>
				))}
			</FormCheckbox>

			<div className="flex justify-end">
				<ButtonMenu
					icon={faFilter}
					text="Filter"
					variant="rounded-md bg-light-primary bg-opacity-90 text-white font-medium text-sm hover:bg-opacity-100"
					onClick={handleFilterClick}
				/>
			</div>
		</div>
	);
};

export default FilterDropdown;
