import { Router } from '@angular/router';
import { TranslationPathsService } from '../../core/services/translation-paths.service';
import { ServiceLocator } from './service-locator.class';
import appRoutes from '../../routes';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';
import { LoaderService } from '../../core/services/loader.service';

export abstract class BaseComponent {
	private _lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'fr';

	private readonly _location: Location;

	private readonly _router: Router;

	private readonly _t: TranslationPathsService;

	private readonly _translate: TranslateService;

	private readonly _authService: AuthService;

	private readonly _loaderService: LoaderService;

	private readonly _routes = appRoutes;

	protected constructor() {
		this._location = ServiceLocator.injector.get<Location>(Location);
		this._t = ServiceLocator.injector.get<TranslationPathsService>(TranslationPathsService);
		this._translate = ServiceLocator.injector.get<TranslateService>(TranslateService);
		this._router = ServiceLocator.injector.get<Router>(Router);
		this._authService = ServiceLocator.injector.get<AuthService>(AuthService);
		this._loaderService = ServiceLocator.injector.get<LoaderService>(LoaderService);
	}

	get loaderService(): LoaderService {
		return this._loaderService;
	}

	get authService(): AuthService {
		return this._authService;
	}

	get translate(): TranslateService {
		return this._translate;
	}

	get location(): Location {
		return this._location;
	}

	get router(): Router {
		return this._router;
	}

	get t(): TranslationPathsService {
		return this._t;
	}

	get lang(): string | null {
		return this._lang;
	}

	get routes(): {
		auth: { login: string; signup: string };
		dashboard: { home: string };
	} {
		return this._routes;
	}
}
