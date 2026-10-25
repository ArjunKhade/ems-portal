export class Employee {
  id?: number = 0;
  name: string = '';
  email: string = '';
  department: string = '';
  location: string = '';
  position: string = '';
  phone: string = '';
  dob: Date = new Date();
  joiningDate: Date = new Date();
  salary: number = 0;
  age: number = 0;
  status: string = '';
  profileImage?: string = '';
}

export interface ApiResponse {
  timeStamp: string;
  message: string;
}

export interface FileUploadResponse {
  fileName: string;
  fileUrl: string;
  fileType: string;
  size: number;
}