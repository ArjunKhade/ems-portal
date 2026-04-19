import { Component, computed, input, Input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from './user.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-avatar',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './user-avatar.html',
  styleUrl: './user-avatar.css',
  standalone: true,
})
export class UserAvatar {
  user = input.required<string | null>();
  signOut = output<void>();
  isPopoverOpen = false;

  initials = computed(() => {
    const user = this.user();
    if (!user) return '';
    return user
      .split(' ')
      .filter(Boolean)
      .map((i) => i[0])
      .join('')
      .toUpperCase();
  });

  togglePopover() {
    this.isPopoverOpen = !this.isPopoverOpen;
  }

  onSignOut() {
    this.signOut.emit();
    this.isPopoverOpen = false;
  }
}
