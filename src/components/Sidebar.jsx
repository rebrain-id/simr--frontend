import {
	faCalendarAlt,
	faSitemap,
	faTableColumns,
	faUserAlt,
} from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/images/logo.png';
import NavLink from '../elements/NavLink';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
	const { pathname } = useLocation();
	const isActive = (path) => pathname.includes(path);
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
				<NavLink
					icon={faTableColumns}
					title="Dashboard"
					to="/"
					variant={
						pathname === '/' ? 'bg-light-primary text-white' : ''
					}
				/>
				<NavLink
					icon={faCalendarAlt}
					title="Agenda"
					to="/agenda?menu=calendar"
					variant={
						isActive('/agenda') ? 'bg-light-primary text-white' : ''
					}
				/>
				<NavLink
					icon={faSitemap}
					title="Program Studi"
					to="/department"
					variant={
						isActive === '/department'
							? 'bg-light-primary text-white'
							: ''
					}
				/>
				<NavLink
					icon={faUserAlt}
					title="Dosen"
					to="/lecturer"
					variant={
						isActive('/dosen') ? 'bg-light-primary text-white' : ''
					}
				/>
			</menu>
		</nav>
	);
};

export default Sidebar;
