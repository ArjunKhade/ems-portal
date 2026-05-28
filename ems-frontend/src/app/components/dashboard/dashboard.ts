import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../employee/employee.service';
import { ApiResponse, Employee } from '../employee/employee.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { UserAvatar } from "../user-avatar/user-avatar";
import { User } from '../user-avatar/user.model';
import { AuthService } from '../auth/auth-service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEmployee } from '../employee/add-employee/add-employee';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Sidebar } from "./sidebar/sidebar";

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, UserAvatar, MatDialogModule, MatButtonModule, Sidebar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  standalone: true
})
export class Dashboard implements OnInit {
  employees: Employee[] = [];
  employeeService = inject(EmployeeService);
  toaster = inject(ToastrService);
  isSidebarCollapsed = false;

  
  //Pagination section 
  PAGE_SIZE = 8;
  VISIBLE_PAGES = 5;
  currentSelectedPage: number = 0;
  visibleStartIndex: number = 0;
  searchControl = new FormControl('');
  departmentControl = new FormControl('All Departments');
  selectedStatus = 'All';
  filteredEmployees: Employee[] = [];

  private cdr = inject(ChangeDetectorRef);

  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private dialogRef: MatDialog) {}

  ngOnInit(): void {
    this.employees = this.route.snapshot.data['employees'];

  /**
   * Initializes filteredEmployees with full employee list
   * so that table is populated on initial load.
   */
  this.filteredEmployees = [...this.employees];

  combineLatest([
    this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged()
    ),
    this.departmentControl.valueChanges.pipe(
      startWith('All Departments'),
      distinctUntilChanged()
    )
  ]).subscribe(([searchTerm, department]) => {
    this.applyFilter(searchTerm || '', department || 'All Departments');
  });


  

  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  get user(){
    let user = null
    try {
      user = sessionStorage.getItem("User");
    } catch (error) {
      console.log("Error while getting user")
    }
    return user;
  }

  get TotalEmployee() {
    return this.dataSource.length || 0;
  }

   /**
   * Generates an array of page indices (0-based)
   * Example: [0,1,2,3,...]
   */
  get NoOfPages(): number[] {
    return Array.from({ length: Math.ceil(this.TotalEmployee / this.PAGE_SIZE) },
     (_, i) => i);
  }

  get Start() {
    return this.currentSelectedPage * this.PAGE_SIZE;
  }

  get End() {
    return this.Start + this.PAGE_SIZE;
  }

  get paginatedEmployees(): Employee[] {
    return this.dataSource.slice(this.Start, this.End);
  }


  onPageClick(num: number) {
    this.currentSelectedPage = num;
  }

  isPageActive(pageNumber: number): boolean {
    return this.currentSelectedPage === pageNumber;
  }

  goToPreviousPage() {
  if (this.currentSelectedPage > 0) {
    this.currentSelectedPage--;

    if (this.currentSelectedPage < this.visibleStartIndex) {
      this.visibleStartIndex--;
    }
  }
}

 goToNextPage() {
  if (this.currentSelectedPage < this.NoOfPages.length - 1) {
    this.currentSelectedPage++;

    if (
      this.currentSelectedPage >=
      this.visibleStartIndex + this.VISIBLE_PAGES
    ) {
      this.visibleStartIndex++;
    }
  }
}


  /**
   * Returns a sliding window of visible page numbers
   * Used to avoid rendering too many page buttons
   */
  get visiblePages(): number[] {
  return this.NoOfPages.slice(
    this.visibleStartIndex,
    this.visibleStartIndex + this.VISIBLE_PAGES
  );
}

get dataSource(): Employee[] {
  return this.filteredEmployees;
}

get statusFilters(): string[] {
  return ['All', 'Active', 'On Leave'];
}

get departments(): string[] {
  return Array.from(
    new Set(
      this.employees
        .map(emp => emp.department?.trim())
        .filter((department): department is string => !!department)
    )
  ).sort((a, b) => a.localeCompare(b));
}

setStatusFilter(status: string): void {
  this.selectedStatus = status;
  this.applyFilter(this.searchControl.value || '');
}

isStatusFilterActive(status: string): boolean {
  return this.selectedStatus === status;
}

applyFilter(searchTerm: string, department: string = this.departmentControl.value || 'All Departments') {
  const term = searchTerm.toLowerCase().trim();
  const selectedDepartment = department.trim();
  const selectedStatus = this.selectedStatus.trim();

  this.filteredEmployees = this.employees.filter(emp => {
    const matchesSearch = !term ||
      emp.name.toLowerCase().includes(term) ||
      emp.department.toLowerCase().includes(term) ||
      emp.location.toLowerCase().includes(term) ||
      emp.id?.toString().includes(term);

    const matchesDepartment =
      selectedDepartment === 'All Departments' ||
      emp.department?.trim() === selectedDepartment;

    const matchesStatus =
      selectedStatus === 'All' ||
      emp.status?.trim() === selectedStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Always reset to the first page when the data changes
  this.currentSelectedPage = 0;
  this.visibleStartIndex = 0;

   // 🔥 FORCE UI UPDATE
   this.cdr.detectChanges();
}


get PageEnd(): number{
  return Math.min(this.Start + this.PAGE_SIZE, this.TotalEmployee);
}

isEmployeeResponse(value: unknown): value is Employee {
  return !!value && typeof value === 'object' && 'name' in value && 'email' in value;
}


signOut(event:any){
 this.authService.logout();
 this.router.navigate(["login"]);
}

addEmployee(){
   const dialog = this.dialogRef.open(AddEmployee, {
    width:'600px',
    data: { Title: 'Add New Employee' }
  })
  
  dialog.afterClosed().subscribe((res: Employee) =>{
    if (!this.isEmployeeResponse(res)) return;

    // add new employee at top
    this.employees.unshift(res);

    this.applyFilter(this.searchControl.value || '');

    this.toaster.success('Employee Added Successfully.', "Success");
     // refresh UI
    this.cdr.detectChanges();
  })
}


onViewClicked(id: number | undefined){
  if (!id) return;

  const employee = this.employees.find(
    emp => emp.id === id
  );

  if (!employee) return;

  const dialog = this.dialogRef.open(AddEmployee, {
    width: '600px',
    data: {
      Title: 'View Employee Details',
      isView: true,
      employee: employee
    }
  });

}

onEditClicked(id: number | undefined){

  if (!id) return;

  const employee = this.employees.find(
    emp => emp.id === id
  );

  if (!employee) return;

  const dialog = this.dialogRef.open(AddEmployee, {
    width: '600px',
    data: {
      Title: 'Edit Employee Details',
      isEdit: true,
      employee: employee
    }
  });

  dialog.afterClosed().subscribe((updatedEmployee: Employee) =>{
    debugger
    console.log(updatedEmployee)
     // if dialog closed without save
    if (!this.isEmployeeResponse(updatedEmployee)) return;

    let index = this.employees.findIndex((emp) => emp.id === updatedEmployee.id);

    if(index !== -1){
      this.employees[index] = updatedEmployee;
    }

    this.applyFilter(this.searchControl.value || '');

    // show success message
    this.toaster.success(
      'Employee Updated Successfully.',
      'Success'
    );

    // refresh UI
    this.cdr.detectChanges();

  })

}

onDeleteClicked(id: number | undefined){
 if(id){
   this.employeeService.deleteEmployee(id).subscribe({
    next:((res: ApiResponse)=>{
      if(res)
      this.toaster.success(res.message, "Success")

      // remove from original array
      this.employees = this.employees.filter(
        emp => emp.id !== id
      );

      this.applyFilter(this.searchControl.value || '');

       // reset page if current page becomes empty
      if (
        this.currentSelectedPage > 0 &&
        this.paginatedEmployees.length === 0
      ) {
        this.currentSelectedPage--;
      }

       // refresh UI
      this.cdr.detectChanges();

    })
   })
 }
}

}
