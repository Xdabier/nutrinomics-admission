import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslationPathsService } from '../core/services/translation-paths.service';
import { LoaderService } from '../core/services/loader.service';
import { SharedModule, WebpackTranslateLoader } from '../shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NetworkService } from '../core/services/network.service';
import { AuthService } from '../core/services/auth.service';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		SharedModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useClass: WebpackTranslateLoader
			}
		})
	],
	providers: [TranslationPathsService, LoaderService, NetworkService, AuthService],
	bootstrap: [AppComponent]
})
export class AppModule {}
