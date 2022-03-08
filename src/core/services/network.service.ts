import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GenericType } from '../../types/generic.type';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class NetworkService {
	constructor(private _http: HttpClient) {}

	private static _setQueryParams<T = GenericType>(query: null | T): string {
		if (!query) {
			return '';
		}

		const keys = Object.keys(query) as Array<keyof T>;
		if (!keys || !keys.length) {
			return '';
		}

		let queryParams = '?';
		keys.forEach((key: keyof T) => {
			let value: unknown = query[key];

			if (!value) {
				return;
			}

			if (typeof value === 'number') {
				value = `${value}` as unknown;
			}

			if (typeof value === 'string') {
				value = value.trim() as unknown;
			}

			const sParameter = encodeURIComponent(value as string);
			queryParams += `${key as string}=${sParameter}&`;
		});

		queryParams = queryParams.slice(0, -1);
		return queryParams;
	}

	post<T = GenericType, R = GenericType>(
		url: string,
		body: null | T,
		params?: HttpParams,
		headers?: HttpHeaders
	): Observable<R> {
		return this._http.post<R>(url, body, { headers, params, withCredentials: true });
	}

	get<T = GenericType, R = GenericType>(url: string, params?: null | T): Observable<R> {
		return this._http.get<R>(`${url}${params ? NetworkService._setQueryParams<T>(params) : ''}`, {
			withCredentials: true
		});
	}

	put<T = GenericType, R = GenericType>(
		url: string,
		body: FormData | T | null,
		params?: HttpParams,
		headers?: HttpHeaders
	): Observable<R> {
		return this._http.put<R>(url, body, { headers, params, withCredentials: true });
	}

	delete<R = GenericType>(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<R> {
		return this._http.delete<R>(url, { headers, params, withCredentials: true });
	}
}
