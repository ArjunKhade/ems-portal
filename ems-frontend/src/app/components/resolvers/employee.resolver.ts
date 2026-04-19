
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, lastValueFrom, of } from 'rxjs';
import { EmployeeService } from '../employee/employee.service';
import { Employee } from '../employee/employee.model';

export const employeeResolver: ResolveFn<Employee[]> = () => {
  const employeeService = inject(EmployeeService);
  return employeeService.getAllEmployees().pipe(
    catchError((error) => {
      console.error('Failed to load employees', error);
      return of([]);
    })
  );
};

//convert the observable to a promise and use async/await:
//Use it when you want to handle an observable with async/await 
// instead of RxJS operators like pipe/catchError.
// export const employeeResolver: ResolveFn<Employee[]> = async () => {
//   const employeeService = inject(EmployeeService);
//   try {
//     return await lastValueFrom(employeeService.getAllEmployees());
//   } catch (error) {
//     console.error('Failed to load employees', error);
//     return [];
//   }
// };