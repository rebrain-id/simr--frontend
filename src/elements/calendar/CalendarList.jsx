import ListAgenda from '../ListAgenda';

const CalendarList = (props) => {
	const { month, agendaThisMonth, username } = props;

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

	if (!agendaThisMonth) {
		return <p>Loading</p>;
	}

	return (
		<div className="w-full">
			{agendaThisMonth && agendaThisMonth.length > 0 ? (
				[...agendaThisMonth]
					.sort((a, b) => {
						return a.date - b.date;
					})
					.map((agenda, index) => (
						<div
							key={index}
							className="mb-10 flex flex-col gap-3 w-full"
						>
							<div>
								<h3 className="text-sm font-semibold">
									{agenda.date} {monthList[month]}
								</h3>
							</div>
							{agenda.data &&
								agenda.data.map((item, itemIndex) => (
									<ListAgenda
										key={itemIndex}
										data={item}
										title={item.title}
										time={`${item.time.start} - ${item.time.finish} WIB`}
										isOwner={
											item.author.username === username
												? true
												: false
										}
										room={item.location}
									/>
								))}
						</div>
					))
			) : (
				<p className="text-center text-xs text-light-secondary">
					Belum ada agenda bulan ini
				</p>
			)}
		</div>
	);
};

export default CalendarList;
