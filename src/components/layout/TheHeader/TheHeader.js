import './TheHeader.scss';
import logo from '@/assets/images/logo.png';

function TheHeader () {
	return (
		<header className='the-header'>
			<div className="the-header__item"></div>
			<img src={logo} alt="logo" className="the-header__item the-header__logo" />
			<div className="the-header__item"></div>
		</header>
	);
}

export default TheHeader;