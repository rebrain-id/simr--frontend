import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../elements/Footer';
import DetailAgendaSidebar from '../components/DetailAgendaSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { closeDetailAgenda } from '../redux/actions/detailAgendaAction';

const MainLayout = () => {
	const { selectedAgenda, showDetailAgenda } = useSelector(
		(state) => state.datailAgenda,
	);
	const dispatch = useDispatch();

	return (
		<main className="min-h-screen h-full w-full flex p-2 bg-light-gray">
			<Sidebar />

			<aside className="w-full px-10">
				{showDetailAgenda && (
					<DetailAgendaSidebar
						onClick={() => dispatch(closeDetailAgenda())}
						data={selectedAgenda}
						isShow={true}
					/>
				)}
				<Header />
				<Outlet />
				<Footer />
			</aside>
		</main>
	);
};

export default MainLayout;
