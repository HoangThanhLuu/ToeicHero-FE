import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {
  @Output() ok = new EventEmitter();
  @Output() cancel = new EventEmitter();

  handleOk() {
    this.ok.emit();
  }

  handleCancel() {

  }
}
