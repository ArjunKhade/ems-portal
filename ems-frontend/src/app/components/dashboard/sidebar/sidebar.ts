import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

type SidebarItem = {
  label: string;
  icon: string;
  route?: string;
};

@Component({
  selector: 'app-sidebar',
  imports: [MatIconModule, NgClass, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  @Input() isCollapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(private router: Router) {}

  menuItems: SidebarItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Employees', icon: 'groups' },
    { label: 'Departments', icon: 'corporate_fare' },
    { label: 'Attendance', icon: 'event_available' },
    { label: 'Payroll', icon: 'payments' },
    { label: 'How To Use', icon: 'play_circle', route: '/how-to-use' },
  ];

  isActive(item: SidebarItem): boolean {
    if (!item.route) return false;
    return this.router.url === item.route;
  }

  navigate(item: SidebarItem): void {
    if (item.route) {
      this.router.navigate([item.route]);
    }
  }
}
