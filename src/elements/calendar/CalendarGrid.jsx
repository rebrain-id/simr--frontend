import { Link } from 'react-router-dom';

const CalendarGrid = (props) => {
	const { year, month, thisYear, thisMonth, agendas } = props;

	const today = new Date().getDate();

	const getDaysInMonth = (year, month) => {
		return new Date(year, month + 1, 0).getDate();
	};

	const getFirstDayOfMonth = (year, month) => {
		return new Date(year, month, 1).getDay();
	};

	const daysInMonth = getDaysInMonth(year, month);
	const firstDayOfMonth = getFirstDayOfMonth(year, month);
	const previousMonth = getDaysInMonth(year, month - 1);

	const days = [];
	for (let i = firstDayOfMonth - 1; i >= 0; i--) {
		days.push({
			day: previousMonth - i,
			isCurrentMonth: false,
		});
	}

	const filteredAgenda = (date) => {
		return agendas.filter(
			(agenda) => agenda.date === String(date).padStart(2, '0'),
		);
	};
	for (let i = 1; i <= daysInMonth; i++) {
		days.push({
			day: i,
			agenda: filteredAgenda(i),
			isCurrentMonth: true,
		});
	}

	const totalRows = days.length >= 35 && firstDayOfMonth >= 3 ? 6 : 5;
	const nextMonth = totalRows * 7 - days.length;
	for (let i = 1; i <= nextMonth; i++) {
		days.push({
			day: i,
			isCurrentMonth: false,
		});
	}
	return (
		<>
			<div className="grid grid-cols-7 border-t border-s border-e rounded-t">
				{[
					'Minggu',
					'Senin',
					'Selasa',
					'Rabu',
					'Kamis',
					'Jumat',
					'Sabtu',
				].map((day, index) => (
					<div
						className="p-3 text-center text-sm font-semibold"
						key={index}
					>
						<p>{day}</p>
					</div>
				))}
			</div>
			<div className="grid grid-cols-7 rounded-b">
				{days.map((day, index) => (
					<Link
						to={`/agenda/date?date=${day.day}&month=${month + 1}&year=${year}`}
						key={index}
						className={`min-h-20 h-auto border flex flex-col justify-start items-start p-3 cursor-pointer hover:bg-light-gray ${today === day.day && thisMonth === month && day.isCurrentMonth && thisYear === year ? 'bg-light-gray' : ''}`}
					>
						<p
							className={
								day.isCurrentMonth
									? 'text-secondary text-sm'
									: 'text-secondary text-opacity-60 text-sm'
							}
						>
							{day ? day.day : null}
						</p>

						{day.agenda && day.agenda.length > 0 && (
							<div className="w-full mt-2">
								{day.agenda.map((item, agendaIndex) => (
									<div key={agendaIndex}>
										{item.data
											.slice(0, 2)
											.map((dataItem, dataIndex) => (
												<div
													className={`truncate text-xs p-2 bg-opacity-50 rounded mb-1 ${
														dataItem.isAuthor
															? 'bg-light-primary text-dark-primary'
															: 'bg-light-warning text-dark-warning'
													}`}
													key={dataIndex}
												>
													{dataItem.title}
												</div>
											))}

										{item.data.length > 2 && (
											<p className="text-[10px] text-secondary">
												+{item.data.length - 2} agenda
												lainnya
											</p>
										)}
									</div>
								))}
							</div>
						)}
					</Link>
				))}
			</div>
		</>
	);
};

export default CalendarGrid;
