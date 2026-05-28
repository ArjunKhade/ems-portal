import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

type SidebarItem = {
  label: string;
  icon: string;
  active?: boolean;
};

@Component({
  selector: 'app-sidebar',
  imports: [MatIconModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  @Input() isCollapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  menuItems: SidebarItem[] = [
    { label: 'Dashboard', icon: 'dashboard', active: true },
    { label: 'Employees', icon: 'groups' },
    { label: 'Departments', icon: 'corporate_fare' },
    { label: 'Attendance', icon: 'event_available' },
    { label: 'Payroll', icon: 'payments' },
  ];
}
