import { Injector } from '@angular/core';

export class ServiceLocator {
	private static _injector: Injector;

	static get injector(): Injector {
		return this._injector;
	}

	static set injector(value: Injector) {
		this._injector = value;
	}
}
