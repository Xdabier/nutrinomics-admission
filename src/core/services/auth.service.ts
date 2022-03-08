import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';
import { UserInterface } from '../../types/user.type';
import { LoginPayloadType, SignUpPayloadType } from '../../types/auth.types';
import { getAuthURL } from '../config/api-routes.config';
import { firstValueFrom } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private _http: NetworkService, private _cookieService: CookieService) {}

	async signUpAPI(user: SignUpPayloadType): Promise<UserInterface> {
		const res: UserInterface = await firstValueFrom<UserInterface>(
			this._http.post<SignUpPayloadType, UserInterface>(getAuthURL('signUp'), user)
		);

		if (!res) {
			throw new Error('Request failed.');
		}

		return res;
	}

	async loginAPI(email: string, password: string): Promise<UserInterface> {
		const res: UserInterface = await firstValueFrom<UserInterface>(
			this._http.post<LoginPayloadType, UserInterface>(getAuthURL('login'), { email, password })
		);

		if (!res) {
			throw new Error('Request failed.');
		}

		return res;
	}

	async currentUserAPI(): Promise<UserInterface> {
		const res: UserInterface = await firstValueFrom<UserInterface>(this._http.get(getAuthURL('currentUser')));

		if (!res) {
			throw new Error('Request failed.');
		}

		return res;
	}

	async logoutAPI(): Promise<void> {
		const res = await firstValueFrom(this._http.post(getAuthURL('logout'), {}));

		if (!res) {
			throw new Error('Request failed.');
		}

		this._cookieService.deleteAll();
		document.cookie = `accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;

		return;
	}
}
