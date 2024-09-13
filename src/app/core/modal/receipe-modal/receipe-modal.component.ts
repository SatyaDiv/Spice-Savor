import { Component, inject, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-receipe-modal',
  templateUrl: './receipe-modal.component.html',
  styleUrls: ['./receipe-modal.component.css']
})
export class ReceipeModalComponent implements OnInit {
  activeModal = inject(NgbActiveModal);
ngOnInit(): void {
  
}

}
