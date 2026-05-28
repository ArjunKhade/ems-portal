import { Component, inject, Inject, OnInit } from '@angular/core';
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
export class AddEmployee  implements OnInit{

  empService = inject(EmployeeService);
  toastr = inject(ToastrService);
  constructor(private dialogRef: MatDialogRef<AddEmployee>,
     @Inject (MAT_DIALOG_DATA) public data: any) {
     }

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
        age: this.data.employee.age
      });
    }

  // VIEW MODE
  if (this.data?.isView) {
    this.employeeForm.disable();
  }

  }

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
  });   

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    const payload = { ...this.employeeForm.value };
    //edit case
    if(payload.empId){
      this.empService.updateEmployee(payload.empId, payload).subscribe({
        next:(res: Employee)=>{
          console.log(res);
          this.dialogRef.close(res);
        },
        error: (err) => {
        this.toastr.error(err.error.message, 'Error');
        }
      })

    }else{
    //add case
    delete payload.empId;
    this.empService.addEmployee(payload).subscribe({
      next: (res) => {
        console.log(res);
        this.dialogRef.close(res);
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
      }
    })
    }
  
  }

  get IsInvalidEmail(){
    return this.employeeForm.get('email')?.invalid 
    && this.employeeForm.get('email')?.touched;
  }

  get IsInvalidPhone(){
    return this.employeeForm.get('phone')?.invalid 
    && this.employeeForm.get('phone')?.touched;
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
