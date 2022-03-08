import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserInterface } from '../../types/user.type';
import appRoutes from '../../routes';

@Injectable({
	providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {
	constructor(private _authService: AuthService, private _router: Router) {}
	async canActivate(): Promise<boolean> {
		let user: UserInterface;

		try {
			user = await this._authService.currentUserAPI();
		} catch (e) {
			return true;
		}

		if (user) {
			await this._router.navigate([appRoutes.dashboard.home]);
			return false;
		}

		return true;
	}
}
