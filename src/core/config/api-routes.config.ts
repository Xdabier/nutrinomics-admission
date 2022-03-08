import { environment } from '../../environments/environment';

const auth = {
	signUp: '/signup',
	login: '/login',
	logout: '/logout',
	currentUser: '/current-user'
};

export const getAuthURL = (child: keyof typeof auth): string => `${environment.apiURL}/auth${auth[child]}`;
