import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../../config/api.constant';
import { FileUploadResponse } from './employee.model';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient) {}

  /**
   * Uploads an employee profile image to backend
   */
  uploadFile(file: File): Observable<FileUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<FileUploadResponse>(API.UPLOAD_FILE, formData);
  }

  /**
   * Resolves the profile image URL (handles filename, full URL, or empty)
   */
  getFileUrl(fileName?: string): string {
    if (!fileName) {
      return '';
    }
    if (fileName.startsWith('http://') || fileName.startsWith('https://')) {
      return fileName;
    }
    return API.VIEW_FILE(fileName);
  }
}
