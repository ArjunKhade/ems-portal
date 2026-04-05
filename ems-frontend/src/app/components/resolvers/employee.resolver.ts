
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { EmployeeService } from '../employee/employee.service';
import { Employee } from '../employee/employee.model';

export const employeeResolver: ResolveFn<Employee[]> = () => {
  const employeeService = inject(EmployeeService);
  return employeeService.getAllEmployees();
};