import React, {useContext} from 'react';
import './menu.component.scss';
import UserContext from './portal/portal.context';
import useAuthHook from '../../hooks/use-auth.hook';
import LoginButton from './auth-button/auth-button.component';

function MenuComponent(): JSX.Element {
	const {authWithGoogle, authWithFacebook, authWithGithub} = useAuthHook();
	const {user, resetUser, isLoginShow, closeLoginForm} = useContext(UserContext);

	const handleLogoutClick = () => {
		resetUser();
	};

	const handlePropagation = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
	};

	return (
		<div className='full-screen-wrapper' onClick={closeLoginForm}>
			<div className={`login-menu ${isLoginShow ? 'open' : ''}`} onClick={handlePropagation}>
				<div className='user-info'>

					{user ? (
						<>
							{user?.image && <img src={user?.image} alt='User avatar'/>}
							<p className='user-name'>{user.name}</p>
							<p className='user-email'>{user?.email}</p>
							<a onClick={handleLogoutClick}>
                                Logout
							</a>
						</>
					) : (
						<div className='login-buttons-wrapper'>
							<p>Login with</p>
							<LoginButton onClick={authWithGoogle} buttonClass='google' buttonText='Google'/>
							<LoginButton onClick={authWithGithub} buttonClass='github' buttonText='GitHub'/>
							<LoginButton onClick={authWithFacebook} buttonClass='facebook' buttonText='Facebook'/>
						</div>
					)}

					<button className='login-button' onClick={closeLoginForm}>
                        Close
					</button>

				</div>
			</div>
		</div>
	);
}

export default React.memo(MenuComponent);
