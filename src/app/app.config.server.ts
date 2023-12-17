import {
  mergeApplicationConfig,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { HttpLoaderFactory, appConfig } from './app.config';
import {
  provideHttpClient,
  withFetch,
  HttpClient,
  withInterceptors,
} from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor, errorInterceptor])
    ),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
