import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserInterface } from '../../types/user.type';
import appRoutes from '../../routes';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private _authService: AuthService, private _router: Router) {}
	async canActivate(): Promise<boolean> {
		let user: UserInterface;

		try {
			user = await this._authService.currentUserAPI();
		} catch (e) {
			await this._router.navigate([appRoutes.auth.login]);
			return false;
		}

		if (!user) {
			await this._router.navigate([appRoutes.auth.login]);
			return false;
		}

		return true;
	}
}
