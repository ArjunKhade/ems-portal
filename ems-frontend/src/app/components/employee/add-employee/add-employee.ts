import { CommonModule } from '@angular/common';
import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-add-employee',
  imports: [CommonModule, MatDialogModule, MatDialogActions, MatDialogContent, ReactiveFormsModule, MatIconModule],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css',
  standalone: true
})
export class AddEmployee implements OnInit {

  empService = inject(EmployeeService);
  toastr = inject(ToastrService);

  // Angular Signals for reactive UI state
  selectedFile = signal<File | null>(null);
  imagePreview = signal<string | null>(null);
  isUploading = signal<boolean>(false);
  isDragging = signal<boolean>(false);

  constructor(
    private dialogRef: MatDialogRef<AddEmployee>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  //create reactive form using form group and form controls
  employeeForm: FormGroup = new FormGroup({
    empId: new FormControl(''),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    location: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    dob: new FormControl('', Validators.required),
    joiningDate: new FormControl('', Validators.required),
    salary: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    profileImage: new FormControl(''),
  });

  ngOnInit(): void {
    if (this.data?.employee) {
      this.employeeForm.patchValue({
        empId: this.data.employee.id,
        name: this.data.employee.name,
        email: this.data.employee.email,
        location: this.data.employee.location,
        department: this.data.employee.department,
        position: this.data.employee.position,
        phone: this.data.employee.phone,
        dob: this.data.employee.dob,
        joiningDate: this.data.employee.joiningDate,
        salary: this.data.employee.salary,
        age: this.data.employee.age,
        profileImage: this.data.employee.profileImage || ''
      });

      if (this.data.employee.profileImage) {
        this.imagePreview.set(this.empService.getProfileImageUrl(this.data.employee.profileImage));
      }
    }

    // VIEW MODE
    if (this.data?.isView) {
      this.employeeForm.disable();
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.handleFile(input.files[0]);
    }
    input.value = '';
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.data?.isView) {
      this.isDragging.set(true);
    }
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
    if (this.data?.isView) return;

    if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  handleFile(file: File): void {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      this.toastr.error('Please select a valid image (JPEG, PNG, WEBP, GIF)', 'Invalid File');
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      this.toastr.error('Image size must be less than 5MB', 'File Too Large');
      return;
    }

    this.selectedFile.set(file);

    // Show immediate client-side preview via signal
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview.set(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to server immediately
    this.isUploading.set(true);

    this.empService.uploadProfilePhoto(file)
      .pipe(
        finalize(() => {
          this.isUploading.set(false);
        })
      )
      .subscribe({
        next: (res) => {
          this.employeeForm.patchValue({ profileImage: res.fileName });
          this.toastr.success('Profile photo uploaded successfully', 'Success');
        },
        error: (err) => {
          const msg = err.error?.message || 'Failed to upload profile photo';
          this.toastr.error(msg, 'Upload Error');
        }
      });
  }

  removePhoto(): void {
    this.imagePreview.set(null);
    this.selectedFile.set(null);
    this.isUploading.set(false);
    this.employeeForm.patchValue({ profileImage: '' });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.isUploading()) {
      this.toastr.warning('Please wait for photo upload to finish', 'Uploading');
      return;
    }

    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const payload = { ...this.employeeForm.value };

    //edit case
    if (payload.empId) {
      this.empService.updateEmployee(payload.empId, payload).subscribe({
        next: (res: Employee) => {
          this.dialogRef.close(res);
        },
        error: (err) => {
          this.toastr.error(err.error?.message || 'Failed to update employee', 'Error');
        }
      });
    } else {
      //add case
      delete payload.empId;
      this.empService.addEmployee(payload).subscribe({
        next: (res) => {
          this.dialogRef.close(res);
        },
        error: (err) => {
          this.toastr.error(err.error?.message || 'Failed to add employee', 'Error');
        }
      });
    }
  }

  get IsInvalidEmail() {
    return this.employeeForm.get('email')?.invalid && this.employeeForm.get('email')?.touched;
  }

  get IsInvalidPhone() {
    return this.employeeForm.get('phone')?.invalid && this.employeeForm.get('phone')?.touched;
  }

  get IsInvalidDOB() {
    return this.employeeForm.get('dob')?.invalid && this.employeeForm.get('dob')?.touched;
  }

  get IsInvalidJoiningDate() {
    return this.employeeForm.get('joiningDate')?.invalid && this.employeeForm.get('joiningDate')?.touched;
  }

  get IsInvalidFullName() {
    return this.employeeForm.get('name')?.invalid && this.employeeForm.get('name')?.touched;
  }

  get IsInvalidLocation() {
    return this.employeeForm.get('location')?.invalid && this.employeeForm.get('location')?.touched;
  }

  get IsInvalidDepartment() {
    return this.employeeForm.get('department')?.invalid && this.employeeForm.get('department')?.touched;
  }

  get IsInvalidPosition() {
    return this.employeeForm.get('position')?.invalid && this.employeeForm.get('position')?.touched;
  }

  get IsInvalidSalary() {
    return this.employeeForm.get('salary')?.invalid && this.employeeForm.get('salary')?.touched;
  }

  get IsInvalidAge() {
    return this.employeeForm.get('age')?.invalid && this.employeeForm.get('age')?.touched;
  }
}
