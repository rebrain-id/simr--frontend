import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CalendarGrid from '../elements/calendar/CalendarGrid';
import {
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import ButtonMenu from '../elements/calendar/ButtonMenu';
import { useEffect, useState } from 'react';
import CalendarList from '../elements/calendar/CalendarList';

const Calendar = () => {
	const getYear = new Date().getFullYear();
	const getMonth = new Date().getMonth();
	const [optionValue, setOptionValue] = useState({
		year: getYear,
		month: getMonth,
	});
	const [inputMonth, setInputMonth] = useState(getMonth);
	const [inputYear, setInputYear] = useState(getYear);
	const [menu, setMenu] = useState('calendar');

	const handleMenu = (name) => {
		setMenu(name);
	};

	useEffect(() => {
		setInputMonth(optionValue.month);
		setInputYear(optionValue.year);
	}, [optionValue]);

	const handleOptionValue = (event) => {
		const { name, value } = event.target;
		setOptionValue({
			...optionValue,
			[name]: parseInt(value, 10),
		});
	};

	const incrementMonth = () => {
		let newMonth = inputMonth + 1;
		let newYear = inputYear;

		if (newMonth > 11) {
			newMonth = 0;
			newYear += 1;
		}

		setOptionValue({
			month: newMonth,
			year: newYear,
		});
	};

	const decrementMonth = () => {
		let newMonth = inputMonth - 1;
		let newYear = inputYear;

		if (newMonth < 0) {
			newMonth = 11;
			newYear -= 1;
		}

		setOptionValue({
			month: newMonth,
			year: newYear,
		});
	};
	const monthList = [
		'Januari',
		'Februari',
		'Maret',
		'April',
		'Mei',
		'Juni',
		'Juli',
		'Agustus',
		'September',
		'Oktober',
		'November',
		'Desember',
	];

	const yearList = Array.from({ length: 15 }, (_, i) => getYear + 5 - i);

	return (
		<>
			<div className="flex items-center justify-between mb-5">
				<div className="flex items-center gap-3 text-secondary">
					<button onClick={decrementMonth}>
						<FontAwesomeIcon
							icon={faChevronLeft}
							className="cursor-pointer"
						/>
					</button>
					<button onClick={incrementMonth}>
						<FontAwesomeIcon
							icon={faChevronRight}
							className="cursor-pointer"
						/>
					</button>

					<div className="flex justify-center items-center font-semibold text-xl gap-2">
						<select
							className="appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:border-transparent text-center"
							name="month"
							onChange={handleOptionValue}
							value={optionValue.month}
						>
							{monthList.map((month, index) => (
								<option
									className="text-sm"
									key={index}
									value={index}
								>
									{month}
								</option>
							))}
						</select>
						<select
							className="appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:border-transparent text-center"
							name="year"
							onChange={handleOptionValue}
							value={optionValue.year}
						>
							{yearList.map((year, index) => (
								<option
									className="text-sm"
									key={index}
									value={year}
								>
									{year}
								</option>
							))}
						</select>
					</div>
				</div>

				<div>
					<ButtonMenu
						variant={`rounded-s-md border-y border-s ${menu === 'calendar' ? 'bg-light-primary text-white' : ''}`}
						text="Kalender"
						onClick={() => handleMenu('calendar')}
					/>
					<ButtonMenu
						variant={`border ${menu === 'list' ? 'bg-light-primary text-white' : ''}`}
						text="Daftar"
						onClick={() => handleMenu('list')}
					/>
					<ButtonMenu
						variant={`rounded-e-md border-y border-e ${menu === 'history' ? 'bg-light-primary text-white' : ''}`}
						text="Riwayat"
						onClick={() => handleMenu('history')}
					/>
				</div>
			</div>

			{menu === 'calendar' ? (
				<CalendarGrid
					month={optionValue.month}
					year={optionValue.year}
					thisYear={getYear}
					thisMonth={getMonth}
				/>
			) : menu === 'list' ? (
				<CalendarList
					month={optionValue.month}
					year={optionValue.year}
				/>
			) : null}
		</>
	);
};

export default Calendar;
