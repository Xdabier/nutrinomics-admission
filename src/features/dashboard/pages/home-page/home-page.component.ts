import { Component } from '@angular/core';
import { BaseComponent } from '../../../../shared/classes/base-component.class';
import { UserInterface } from '../../../../types/user.type';

@Component({
	selector: 'nutrinomics-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent extends BaseComponent {
	currentUser: Promise<UserInterface> = this.authService.currentUserAPI();

	constructor() {
		super();
	}

	async logout() {
		this.loaderService.showLoader();

		try {
			await this.authService.logoutAPI();
			await this.router.navigate([this.routes.auth.login]);
			this.loaderService.hideLoader();
		} catch (e) {
			alert(JSON.stringify(e));
			this.loaderService.hideLoader();
		}
	}
}
