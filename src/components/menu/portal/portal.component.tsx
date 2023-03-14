import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import LoginMenu from '../menu.component';
import './portal.component.scss';
import userContext from './portal.context';

const PortalComponent = () => {
	const {isLoginShow, openLoginForm, user} = useContext(userContext);

	return ReactDOM.createPortal(
		<div>
			<div className={`login-portal ${isLoginShow ? 'show' : ''}`} >
				<LoginMenu/>
			</div>
			{!isLoginShow && (
				<button className='login-button' onClick={openLoginForm}>
					{user ? user.name : 'Login'}
				</button>
			)}
		</div>
		,
		document.getElementById('login-portal-root')!,
	);
};

export default PortalComponent;
