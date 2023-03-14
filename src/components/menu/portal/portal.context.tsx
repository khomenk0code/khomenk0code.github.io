import React from 'react';

export type User = {
	name: string;
	email?: string;
	image?: string;
};

interface IUserContext {
	user: User | null;
	resetUser: () => void;
	setUser: (user: User) => void;
	isLoginShow: boolean;
	openLoginForm: () => void;
	closeLoginForm: () => void;
}

const PortalContext = React.createContext<IUserContext>({
	user: null,
	resetUser() {},
	setUser() {},
	isLoginShow: false,
	openLoginForm() {},
	closeLoginForm() {},
});

export default PortalContext;
