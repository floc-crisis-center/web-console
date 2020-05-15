import { FormControl, Validators } from '@angular/forms';

export class Message {
  type: string;
  text: string;
  styleClass: string;
  submitLabel: string;
  userText: string;
  ctrl: FormControl;
  min: number;
  max: number;

  static replyMessage(text: string, styleClass: string): Message {
    const msg = new Message();
    msg.text = text.replace(/\n/g, '<br>');
    msg.styleClass = styleClass;
    return msg;
  }

  static inputMessage(data: any): Message {
    const msg = new Message();
    msg.type = data.type;
    msg.submitLabel = data.submitLabel;
    msg.styleClass = 'reply';
    msg.ctrl = new FormControl('', [Validators.required]);

    if (data.type === 'number') {
      msg.min = data.min;
      msg.max = data.max;
    }

    return msg;
  }

  static typingMessage() {
    const msg = new Message();
    msg.type = 'typing';
    return msg;
  }
}
