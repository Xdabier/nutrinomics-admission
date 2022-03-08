import dashboard from './dashboard.routes';
import auth from './auth.routes';

export default {
	dashboard: dashboard('/'),
	auth: auth('/auth')
};
