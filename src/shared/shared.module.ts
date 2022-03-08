import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import lng from '../locals/fr';
import { asapScheduler, Observable, pluck, scheduled } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

export class WebpackTranslateLoader implements TranslateLoader {
	getTranslation(lang: string): Observable<typeof lng> {
		return scheduled<typeof lng>(import(`../locals/${lang}/index.ts`), asapScheduler).pipe(
			pluck('default')
		) as Observable<typeof lng>;
	}
}

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useClass: WebpackTranslateLoader
			}
		})
	],
	exports: [TranslateModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule {}
