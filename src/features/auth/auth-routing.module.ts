import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { AuthComponent } from './auth.component';

const routes: Routes = [
	{
		path: '',
		component: AuthComponent,
		children: [
			{
				path: 'login',
				component: LoginPageComponent
			},
			{
				path: 'signup',
				component: SignupPageComponent
			},
			{
				path: '',
				redirectTo: 'login'
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthRoutingModule {}
