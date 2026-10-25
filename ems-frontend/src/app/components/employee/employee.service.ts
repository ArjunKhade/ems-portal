import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../config/api.constant';
import { Observable } from 'rxjs';
import { ApiResponse, Employee, FileUploadResponse } from './employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(API.GET_EMPLOYEES);
  }

  addEmployee(employee: Employee) : Observable<Employee>{
    return this.http.post<Employee>(API.CREATE_EMPLOYEE, employee);
  }

   getEmployee(id: number) : Observable<Employee>{
    return this.http.get<Employee>(API.GET_EMPLOYEE(id));
  }

  deleteEmployee(id: number) : Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(API.DELETE_EMPLOYEE(id));
  }

  updateEmployee(id:number, employee: Employee): Observable<Employee>{
   return this.http.put<Employee>(API.UPDATE_EMPLOYEE(id), employee);
  }

  uploadProfilePhoto(file: File): Observable<FileUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<FileUploadResponse>(API.UPLOAD_FILE, formData);
  }

  getProfileImageUrl(fileName?: string): string {
    if (!fileName) {
      return '';
    }
    if (fileName.startsWith('http://') || fileName.startsWith('https://')) {
      return fileName;
    }
    return API.VIEW_FILE(fileName);
  }

}

