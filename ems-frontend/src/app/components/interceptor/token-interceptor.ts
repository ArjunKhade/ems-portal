import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  //get the token from session storage
  const token = sessionStorage.getItem('AuthToken');
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
