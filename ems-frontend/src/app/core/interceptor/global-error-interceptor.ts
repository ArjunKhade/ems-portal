import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const globalErrorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        const message = getErrorMessage(error);
        toastr.error(message, 'Request failed');
      }

      return throwError(() => error);
    }),
  );
};

function getErrorMessage(error: HttpErrorResponse): string {
  switch (error.status) {
    case 0:
      return 'Unable to connect to the server. Check your connection and try again.';
    case 400:
      return 'The request was invalid. Check the information and try again.';
    case 401:
      return 'Your session has expired or you are not authorized. Please log in again.';
    case 403:
      return 'You do not have permission to perform this action.';
    case 404:
      return 'The requested resource could not be found.';
    case 409:
      return 'This request conflicts with the current data.';
    case 422:
      return 'Some of the submitted information could not be processed.';
    case 500:
      return 'An unexpected server error occurred. Please try again later.';
    default:
      return error.status >= 500
        ? 'A server error occurred. Please try again later.'
        : 'The request failed. Please try again.';
  }
}
