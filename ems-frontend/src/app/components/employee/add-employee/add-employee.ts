import { Component, inject, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-employee',
  imports: [MatDialogModule, MatDialogActions, MatDialogContent, ReactiveFormsModule],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css',
  standalone: true
})
export class AddEmployee {

  empService = inject(EmployeeService);
  toastr = inject(ToastrService);
  constructor(private dialogRef: MatDialogRef<AddEmployee>,
     @Inject (MAT_DIALOG_DATA) public data: any) {
     }
  //create reactive form using form group and form controls
   employeeForm: FormGroup = new FormGroup({
    empId: new FormControl(''),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    location: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    mobileNo: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    dob: new FormControl('', Validators.required),
    joiningDate: new FormControl('', Validators.required),
    salary: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
  });   

  onCancel(): void {
    this.dialogRef.close('Closed');
  }

  onSubmit(){
    const payload = { ...this.employeeForm.value };
    delete payload.empId;
    this.empService.addEmployee(payload).subscribe({
      next: (res) => {
        console.log(res);
        this.dialogRef.close();
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
      }
    })
  }

  get IsInvalidEmail(){
    return this.employeeForm.get('email')?.invalid 
    && this.employeeForm.get('email')?.touched;
  }

  get IsInvalidMobileNo(){
    return this.employeeForm.get('mobileNo')?.invalid 
    && this.employeeForm.get('mobileNo')?.touched;
  }

  get IsInvalidDOB(){
    return this.employeeForm.get('dob')?.invalid 
    && this.employeeForm.get('dob')?.touched;
  }

  get IsInvalidJoiningDate(){
    return this.employeeForm.get('joiningDate')?.invalid 
    && this.employeeForm.get('joiningDate')?.touched;
  }


  

  get IsInvalidFullName(){
    return this.employeeForm.get('name')?.invalid 
    && this.employeeForm.get('name')?.touched;
  }

  get IsInvalidLocation(){
    return this.employeeForm.get('location')?.invalid 
    && this.employeeForm.get('location')?.touched;
  }

  get IsInvalidDepartment(){
    return this.employeeForm.get('department')?.invalid 
    && this.employeeForm.get('department')?.touched;
  }

  get IsInvalidPosition(){
    return this.employeeForm.get('position')?.invalid 
    && this.employeeForm.get('position')?.touched;
  }

  get IsInvalidSalary(){
    return this.employeeForm.get('salary')?.invalid 
    && this.employeeForm.get('salary')?.touched;
  }

  get IsInvalidAge(){
    return this.employeeForm.get('age')?.invalid 
    && this.employeeForm.get('age')?.touched;
  }





}
