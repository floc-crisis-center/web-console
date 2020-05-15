import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { BotBuilderService } from 'src/app/bot/bot-builder.service';
import { Message } from '../chat-message/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: Message[];
  parent: any;

  constructor(private botBuilderService: BotBuilderService) { }

  ngOnInit(): void {
    this.messages = [];
    const botId = this.parent.bot.id;
    this.botBuilderService.connect(botId, () => { this.messages.push(Message.typingMessage()); }, (data: any) => {
      if (this.messages[this.messages.length - 1].type === 'typing') {
        this.messages.pop();
      }
      if (data) {
        this.buildMessage(data);
      }
    });
  }

  ngOnDestroy(): void {
    this.botBuilderService.disconnect();
    this.messages = [];
  }

  send(): void {
    const msg = this.messages[this.messages.length - 1];
    if (msg.ctrl.invalid) {
      return;
    }
    const replyText = '' + msg.ctrl.value;
    const newMsg = Message.replyMessage(replyText, 'reply');
    this.messages[this.messages.length - 1] = newMsg;
    this.messages.push(Message.typingMessage());
    this.botBuilderService.send(replyText);
  }

  clear(): void {
    this.parent.clearChat();
  }

  trackByFn(index, item) {
    return index;
  }

  buildMessage(data) {
    const msg = new Message();
    if (data.text) {
      msg.text = data.text;
      msg.styleClass = 'message';
      this.messages.push(msg);
    } else if (data.length > 0) {
      msg.text = data[0].text;
      msg.styleClass = 'message';
      this.messages.push(msg);

      if (data[0].type === 'close') {
        this.messages.push(Message.typingMessage());
        this.parent.generateBot();
      } else {
        const inputMsg = Message.inputMessage(data[0]);
        this.messages.push(inputMsg);
      }
    }
  }
}
