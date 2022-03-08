import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { NotAuthGuard } from '../core/guards/not-auth.guard';

const routes: Routes = [
	{
		path: '',
		canActivate: [AuthGuard],
		loadChildren: () => import('../features/dashboard/dashboard.module').then((module) => module.DashboardModule)
	},
	{
		path: 'auth',
		canActivate: [NotAuthGuard],
		loadChildren: () => import('../features/auth/auth.module').then((module) => module.AuthModule)
	},
	{
		path: '**',
		redirectTo: ''
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
