import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './components/auth/auth-interceptor';
import { AuthGuard } from './components/auth/auth.guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    AuthGuard,
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
