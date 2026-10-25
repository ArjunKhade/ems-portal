import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  debugger;
  //get the token from session storage
  const token = sessionStorage.getItem('AuthToken');

  //if request is for login or signup then return same req
  if (req.url.includes('login') || req.url.includes('signup')) {
    return next(req);
  }

  //if token is valid set Authorization header for token
  if (token) {
    const cloneReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
   //return modifield req
    return next(cloneReq);
  }
  //else return same req
  return next(req);
};
