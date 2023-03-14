import React from 'react';
import './auth-button.component.scss';

type Props = {
	buttonText: string;
	buttonClass: string;
	children?: React.ReactNode;
	onClick?: () => void;
};

const LoginButton: React.FC<Props> = ({buttonText, buttonClass, onClick}) => (
	<div className={`buttons-wrapper ${buttonClass}-login`} onClick={onClick}>
		<button>
			<div className='login-wrapper'>
				<img
					className={`${buttonClass}-icon`}
					src={`/assets/icons/${buttonClass}-logo.svg`}
					alt={`${buttonClass}`}
				/>
			</div>
			{buttonText}
		</button>
	</div>
);

export default LoginButton;
