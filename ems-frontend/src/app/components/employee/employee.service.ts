import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../config/api.constant';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(API.GET_EMPLOYEES);
  }


}
