import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {
  @Input('isRunning') isRunning: boolean = false;
  @Input() showConsent: boolean = false;
  @Input() isRecordingLog: boolean = false;
  
  @Output() acceptConsent = new EventEmitter<void>();
  @Output() cancelConsent = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }
}
