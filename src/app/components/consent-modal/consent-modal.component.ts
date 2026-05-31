import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-consent-modal',
  templateUrl: './consent-modal.component.html',
  styleUrls: ['./consent-modal.component.scss']
})
export class ConsentModalComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() consent = new EventEmitter<void>();
  
  hasConsented = false;

  constructor() {}

  onCancel = (): void => {
    this.cancel.emit();
  };

  onConsent = (): void => {
    if (this.hasConsented) {
      localStorage.setItem('consentimento_coleta', 'true');
      this.consent.emit();
    }
  };
}
