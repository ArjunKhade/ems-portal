import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../employee/employee.service';
import { Employee } from '../employee/employee.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  employees: Employee[] = [];
  employeeService = inject(EmployeeService);
  toaster = inject(ToastrService);

  
  //Pagination section 
  PAGE_SIZE = 8;
  VISIBLE_PAGES = 20;
  currentSelectedPage: number = 0;
  visibleStartIndex: number = 0;
  searchControl = new FormControl('');
  filteredEmployees: Employee[] = [];

  private cdr = inject(ChangeDetectorRef);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.employees = this.route.snapshot.data['employees'];

  /**
   * Initializes filteredEmployees with full employee list
   * so that table is populated on initial load.
   */
  this.filteredEmployees = [...this.employees];

  //Subscribes to search input value changes
  this.searchControl.valueChanges.pipe(
    startWith(''),//ensures filter runs on init
    debounceTime(300),//avoids excessive filtering calls
    distinctUntilChanged()//prevents duplicate executions
  ).subscribe(value => {
    // Applies filtering logic on employee list
    this.applyFilter(value || '');
  });

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

applyFilter(searchTerm: string) {
  const term = searchTerm.toLowerCase().trim();

  if (!term) {
    // If empty, show everyone
    this.filteredEmployees = [...this.employees];
  } else {
    // Perform the filter
    this.filteredEmployees = this.employees.filter(emp =>
      emp.name.toLowerCase().includes(term) ||
      emp.department.toLowerCase().includes(term) ||
      emp.location.toLowerCase().includes(term) ||
      emp.id?.toString().includes(term)
    );
  }

  // Always reset to the first page when the data changes
  this.currentSelectedPage = 0;
  this.visibleStartIndex = 0;

   // 🔥 FORCE UI UPDATE
   this.cdr.detectChanges();
}


get PageEnd(): number{
  return Math.min(this.Start + this.PAGE_SIZE, this.TotalEmployee);
}

}
