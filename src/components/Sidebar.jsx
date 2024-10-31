import {
	faCalendarAlt,
	faSitemap,
	faTableColumns,
	faUserAlt,
	faUsers,
} from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/images/logo.png';
import NavLink from '../elements/NavLink';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const Sidebar = () => {
	const { pathname } = useLocation();
	const isActive = (path) => pathname.includes(path);
	const role = sessionStorage.getItem('access_token')
		? jwtDecode(sessionStorage.getItem('access_token')).role
		: null;

	const [sidebarFull, setSidebarFull] = useState(() => {
		const savedSize = localStorage.getItem('size');
		return savedSize ? JSON.parse(savedSize) : true;
	});

	useEffect(() => {
		localStorage.setItem('size', JSON.stringify(sidebarFull));
	}, [sidebarFull]);

	const handleSizeSidebar = () => {
		setSidebarFull(!sidebarFull);
	};

	return (
		<>
			<nav
				className={`h-auto bg-light-white rounded-lg px-3 pt-6 drop-shadow-right-bottom ${sidebarFull ? 'w-80' : 'w-24'} transition-all `}
			>
				<header
					className={`flex justify-between items-center mb-28 ${sidebarFull ? '' : 'flex-col justify-center gap-3'}`}
				>
					<div className="flex gap-3">
						<div className="mx-auto my-auto">
							<img src={logo} alt="" className="w-12 h-auto" />
						</div>

						{sidebarFull && (
							<div className="my-auto">
								<h1 className="text-2xl font-montserrat font-extrabold tracking-widest leading-6">
									SIM - R
								</h1>
								<h2 className="text-xs font-bold tracking-wider">
									FAKULTAS TEKNIK
								</h2>
							</div>
						)}
					</div>

					<div
						onClick={handleSizeSidebar}
						className="w-6 h-6 rounded-full border border-primary flex items-center justify-center cursor-pointer"
					>
						<div
							className={`w-4 h-4 rounded-full transition-all hover:bg-light-primary ${sidebarFull ? '' : 'bg-light-primary'}`}
						></div>
					</div>
				</header>

				<menu className="flex flex-col gap-2">
					<NavLink
						isVisible={sidebarFull}
						icon={faTableColumns}
						title="Dashboard"
						to="/"
						variant={
							pathname === '/'
								? 'bg-light-primary text-white'
								: ''
						}
					/>
					<NavLink
						isVisible={sidebarFull}
						icon={faCalendarAlt}
						title="Agenda"
						to="/agenda?menu=calendar"
						variant={
							isActive('/agenda')
								? 'bg-light-primary text-white'
								: ''
						}
					/>
					{role && role === 'FAKULTAS' && (
						<NavLink
							isVisible={sidebarFull}
							icon={faSitemap}
							title="Program Studi"
							to="/prodi"
							variant={
								isActive('/prodi')
									? 'bg-light-primary text-white'
									: ''
							}
						/>
					)}
					<NavLink
						isVisible={sidebarFull}
						icon={faUserAlt}
						title="Dosen"
						to="/dosen"
						variant={
							isActive('/dosen')
								? 'bg-light-primary text-white'
								: ''
						}
					/>
					<NavLink
						isVisible={sidebarFull}
						icon={faUsers}
						title="Pengguna"
						to="/user"
						variant={
							isActive('/user')
								? 'bg-light-primary text-white'
								: ''
						}
					/>
				</menu>
			</nav>
		</>
	);
};

export default Sidebar;
