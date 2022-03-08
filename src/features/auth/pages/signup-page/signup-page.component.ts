import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../shared/classes/base-component.class';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpPayloadType } from '../../../../types/auth.types';

@Component({
	selector: 'nutrinomics-signup-page',
	templateUrl: './signup-page.component.html',
	styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent extends BaseComponent implements OnInit {
	signupForm!: FormGroup;

	constructor() {
		super();
	}

	ngOnInit(): void {
		this.signupForm = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.email]),
			username: new FormControl('', [Validators.required]),
			password: new FormControl('', [Validators.required, Validators.minLength(6)])
		});
	}

	async submitSignup(): Promise<void> {
		this.loaderService.showLoader();

		try {
			await this.authService.signUpAPI(this.signupForm.getRawValue() as SignUpPayloadType);
			this.loaderService.hideLoader();
			await this.router.navigate([this.routes.dashboard.home]);
		} catch (e: any) {
			alert(e.error);
			this.loaderService.hideLoader();
		}
	}
}
