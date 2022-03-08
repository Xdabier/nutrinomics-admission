import { Component, Injector } from '@angular/core';
import { ServiceLocator } from '../shared/classes/service-locator.class';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'nutrinomics-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(private _injector: Injector, private _translateService: TranslateService) {
		ServiceLocator.injector = this._injector;

		const defaultLang = this._translateService.getBrowserLang() || 'fr';
		const currentLang = localStorage.getItem('lang');
		_translateService.setDefaultLang(currentLang || defaultLang);
	}
}
