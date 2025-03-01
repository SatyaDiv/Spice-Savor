import { Component, inject, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-receipe-modal',
  templateUrl: './receipe-modal.component.html',
  styleUrls: ['./receipe-modal.component.css'],
})
export class ReceipeModalComponent implements OnInit {
  activeModal = inject(NgbActiveModal);
  userName: string = '';
  emailId: string = '';
  userInitials: string = 'U'; // Store initials here

  constructor() {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    const fullname = localStorage.getItem('fullname');
    const email = localStorage.getItem('email');

    if (fullname && email) {
      this.userName = fullname;
      this.emailId = email;
      this.userInitials = this.getUserInitials(this.userName); // Calculate initials after setting name
    }
  }

  getUserInitials(name: string): string {
    if (!name || name.trim() === 'N/A') return 'U';

    const nameParts = name.replace(/['"]/g, "").trim().split(/\s+/);

    return nameParts.length === 1
      ? nameParts[0].charAt(0).toUpperCase()
      : (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  }
}
