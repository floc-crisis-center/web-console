import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Message } from './message';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit, AfterViewInit {
  @Input() message: Message;
  @Input() parent: any;
  @ViewChild('rspInput') input: ElementRef;

  container: HTMLElement;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.container = document.getElementById('msgContainer');
    this.container.scrollTop = this.container.scrollHeight;

    if (this.input) {
      this.input.nativeElement.focus();
    }
  }
}
