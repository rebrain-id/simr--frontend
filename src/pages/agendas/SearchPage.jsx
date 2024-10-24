import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchSearchAgenda } from '../../redux/actions/agendaAction';
import ListAgenda from '../../elements/ListAgenda';

const SearchPage = () => {
	const [searchParams] = useSearchParams();
	const dispatch = useDispatch();

	const search = searchParams.get('search');

	const { agenda, loading, isUpdated } = useSelector((state) => state.agenda);

	useEffect(() => {
		if (search) {
			dispatch(fetchSearchAgenda({ keyword: search }));
		}
	}, [dispatch, search, isUpdated]);

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

	console.log(agenda);
	return (
		<div className="bg-white px-10 py-5 rounded drop-shadow-bottom mt-5">
			<h1 className="text-base font-semibold mb-5">
				Pencarian : {search}
			</h1>
			{loading ? (
				<p className="text-center text-xs text-light-secondary">
					mencari data agenda
				</p>
			) : agenda && agenda.length ? (
				<div className="w-full h-full flex flex-col gap-5">
					{agenda.map((item) => (
						<ListAgenda
							key={item.uuid}
							data={item}
							title={item.title}
							date={`${item.date.start} ${monthList[item.month.start - 1]} ${item.year.start}`}
							time={`${item.time.start} - ${item.time.finish} WIB`}
							isOwner={item.isAuthor}
							room={item.location}
						/>
					))}
				</div>
			) : (
				<p className="text-center text-xs text-light-secondary">
					agenda yang anda cari tidak ditemukan
				</p>
			)}
		</div>
	);
};

export default SearchPage;
