import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const AUTH_TOKEN = sessionStorage.getItem('id_token');

  if (AUTH_TOKEN) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });
    return next(authReq);
  }

  return next(req);
};
