const CalendarGrid = (props) => {
	const { year, month, thisYear, thisMonth } = props;

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

	for (let i = 1; i <= daysInMonth; i++) {
		days.push({
			day: i,
			isCurrentMonth: true,
		});
	}

	const totalRows = days.length > 35 || firstDayOfMonth >= 3 ? 6 : 5;
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
					<div
						key={index}
						className={`min-h-20 h-auto border flex justify-start items-start p-3 cursor-pointer hover:bg-light-gray ${today === day.day && thisMonth === month && day.isCurrentMonth && thisYear === year ? 'bg-light-gray' : ''}`}
					>
						<p
							className={
								day.isCurrentMonth
									? 'text-secondary text-sm'
									: 'text-light-gray text-sm'
							}
						>
							{day ? day.day : null}
						</p>
					</div>
				))}
			</div>
		</>
	);
};

export default CalendarGrid;
