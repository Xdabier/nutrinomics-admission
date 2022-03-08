export default (mainPath: string): { login: string; signup: string } => ({
	login: `${mainPath}/login`,
	signup: `${mainPath}/signup`
});
