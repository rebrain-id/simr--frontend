import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CalendarGrid from '../elements/calendar/CalendarGrid';
import {
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import ButtonMenu from '../elements/calendar/ButtonMenu';
import { useEffect, useState } from 'react';
import CalendarList from '../elements/calendar/CalendarList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAgendaThisMonth } from '../redux/actions/agendaAction';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AgendaHistory from './AgendaHistory';

const Calendar = () => {
	const [searchParam] = useSearchParams();
	const menu = searchParam.get('menu');
	const getYear = new Date().getFullYear();
	const getMonth = new Date().getMonth();
	const [optionValue, setOptionValue] = useState({
		year: getYear,
		month: getMonth,
	});
	const navigate = useNavigate();
	const [inputMonth, setInputMonth] = useState(getMonth);
	const [inputYear, setInputYear] = useState(getYear);
	const dispatch = useDispatch();

	const { agendaThisMonth, isUpdated, loading } = useSelector(
		(state) => state.agenda,
	);
	const agenda = agendaThisMonth;

	useEffect(() => {
		setInputMonth(optionValue.month);
		setInputYear(optionValue.year);

		if (menu !== 'history') {
			dispatch(
				fetchAgendaThisMonth({
					year: optionValue.year,
					month: optionValue.month,
				}),
			);
		}
	}, [optionValue, dispatch, isUpdated, menu]);

	const validMenuValues = ['calendar', 'list', 'history'];
	if (!validMenuValues.includes(menu)) {
		navigate('/agenda?menu=calendar');
	}

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
			{menu !== 'history' ? (
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
								link={'/agenda?menu=calendar'}
								variant={`rounded-s-md border-y border-s ${menu === 'calendar' ? 'bg-light-primary text-white' : ''}`}
								text="Kalender"
							/>
							<ButtonMenu
								link={'/agenda?menu=list'}
								variant={`border ${menu === 'list' ? 'bg-light-primary text-white' : ''}`}
								text="Daftar"
							/>
							<ButtonMenu
								link={
									'/agenda?menu=history&from=null&to=null&type=null&take=10&skip=1'
								}
								variant={`rounded-e-md border-y border-e ${menu === 'history' ? 'bg-light-primary text-white' : ''}`}
								text="Riwayat"
							/>
						</div>
					</div>

					{loading ? (
						<p className="text-center text-xs text-light-secondary mt-5">
							Sedang memuat data riwayat agenda
						</p>
					) : menu === 'calendar' ? (
						<CalendarGrid
							month={optionValue.month}
							year={optionValue.year}
							thisYear={getYear}
							thisMonth={getMonth}
							agendas={agenda}
						/>
					) : menu === 'list' ? (
						<CalendarList
							month={optionValue.month}
							agendaThisMonth={agenda}
							isLoading={loading}
						/>
					) : null}
				</>
			) : (
				<>
					<div className="flex justify-between items-center mb-5">
						<h1 className="text-xl font-semibold">
							Agenda History
						</h1>

						<div>
							<ButtonMenu
								link={'/agenda?menu=calendar'}
								variant={`rounded-s-md border-y border-s`}
								text="Kalender"
							/>
							<ButtonMenu
								link={'/agenda?menu=list'}
								variant={`border`}
								text="Daftar"
							/>
							<ButtonMenu
								link={
									'/agenda?menu=history&from=null&to=null&type=null&take=10&skip=1'
								}
								variant={`rounded-e-md border-y border-e bg-light-primary text-white`}
								text="Riwayat"
							/>
						</div>
					</div>

					<AgendaHistory />
				</>
			)}
		</>
	);
};

export default Calendar;
