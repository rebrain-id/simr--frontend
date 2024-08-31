import {
	faCalendarAlt,
	faSitemap,
	faTableColumns,
	faUserAlt,
} from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/images/logo.png';
import NavLink from '../elements/NavLink';

const Sidebar = () => {
	return (
		<nav className="h-auto w-80 bg-light-white rounded-lg px-3 pt-6 drop-shadow-right-bottom">
			<header className="flex justify-between items-center mb-28">
				<div className="flex gap-3">
					<div className="mx-auto my-auto">
						<img src={logo} alt="" className="w-12 h-auto" />
					</div>

					<div className="my-auto">
						<h1 className="text-2xl font-montserrat font-extrabold tracking-widest leading-6">
							SIM - R
						</h1>
						<h2 className="text-xs font-bold tracking-wider">
							FAKULTAS TEKNIK
						</h2>
					</div>
				</div>
			</header>

			<menu className="flex flex-col gap-2">
				<NavLink icon={faTableColumns} title="Dashboard" to="/" />
				<NavLink icon={faCalendarAlt} title="Agenda" to="/agenda" />
				<NavLink icon={faSitemap} title="Program Studi" to="/prodi" />
				<NavLink icon={faUserAlt} title="Dosen" to="/dosen" />
			</menu>
		</nav>
	);
};

export default Sidebar;
