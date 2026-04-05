import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../employee/employee.service';
import { Employee } from '../employee/employee.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.employees = this.route.snapshot.data['employees'];
  }

  get TotalEmployee() {
    return this.employees.length || 0;
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
    return this.employees.slice(this.Start, this.End);
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
    }
  }

  goToNextPage() {
    if (this.currentSelectedPage < this.NoOfPages.length - 1) {
      this.currentSelectedPage++;
    }
  }


  /**
   * Returns a sliding window of visible page numbers
   * Used to avoid rendering too many page buttons
   */
  get visiblePages(): number[] {
  const total = this.NoOfPages.length;
  const current = this.currentSelectedPage;

  let start = Math.max(0, current - Math.floor(this.VISIBLE_PAGES / 2));
  let end = start + this.VISIBLE_PAGES;

  if (end > total) {
    end = total;
    start = Math.max(0, end - this.VISIBLE_PAGES);
  }

  return this.NoOfPages.slice(start, end);
}

}
