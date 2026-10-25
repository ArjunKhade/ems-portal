import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-how-to-use',
  imports: [CommonModule, MatIconModule],
  templateUrl: './how-to-use.html',
  styleUrl: './how-to-use.css',
  standalone: true,
})
export class HowToUse {
  private readonly router = inject(Router);
  private readonly sanitizer = inject(DomSanitizer);

  readonly videoSrc: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('EMS_Portal.mp4');

  /** Direct download — served locally from the public/ folder */
  readonly downloadFileName = 'EMS_Portal_Tutorial.mp4';

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  downloadVideo(): void {
    const anchor = document.createElement('a');
    anchor.href = 'EMS_Portal.mp4';
    anchor.download = this.downloadFileName;
    anchor.click();
  }
}
