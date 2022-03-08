import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../shared/classes/base-component.class';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'nutrinomics-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent extends BaseComponent implements OnInit, OnDestroy {
	loginForm!: FormGroup;
	private _unsubscriber: Subject<any> = new Subject<any>();

	constructor() {
		super();
	}

	ngOnInit(): void {
		this.loginForm = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required, Validators.minLength(6)]),
			lang: new FormControl(this.translate.defaultLang, [Validators.required])
		});

		this.loginForm
			.get('lang')
			?.valueChanges.pipe(takeUntil(this._unsubscriber))
			.subscribe((value: 'fr' | 'en') => {
				if (value) {
					localStorage.setItem('lang', value);
					this.translate.setDefaultLang(value);
				}
			});
	}

	ngOnDestroy(): void {
		if (this._unsubscriber) {
			this._unsubscriber.next(null);
			this._unsubscriber.unsubscribe();
		}
	}

	async submitLogin(): Promise<void> {
		this.loaderService.showLoader();

		try {
			await this.authService.loginAPI(
				this.loginForm.get('email')?.value as string,
				this.loginForm.get('password')?.value as string
			);
			this.loaderService.hideLoader();
			await this.router.navigate([this.routes.dashboard.home]);
		} catch (e) {
			alert(e);
			this.loaderService.hideLoader();
		}
	}
}
