import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BotBuilderService {
  socket: any;
  messagesQueue: string[];
  intervalId: any;
  botId: string;

  constructor() {
    this.messagesQueue = [];
   }

  connect(botId: string, onConnect: any, onBotUttered: any) {
    this.botId = botId;

    this.socket = io(environment.botBuilderURL, {
      path: '/socket.io/'
    });

    this.socket.on('connect_error', (error) => {
      onConnect();
      onBotUttered({
        text: 'Sorry, looks like the service is down'
      });
      onBotUttered({
        text: 'Please try later'
      });
      this.socket.close();
    });

    this.socket.on('bot_uttered', onBotUttered);

    this.socket.on('connect', () => {
      console.log(`connect:${this.socket.id}`);
      onConnect();
      this.messagesQueue.push('Hello');
      this.intervalId = setInterval(() => this.dispatch(), 500);
    });
  }

  disconnect() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.socket.close();
    this.messagesQueue = [];
    this.botId = null;
  }

  send(msg: string) {
    this.messagesQueue.push(msg);
  }

  private dispatch() {
    if (!this.socket.connected || this.messagesQueue.length === 0) {
      return;
    }

    this.socket.emit('user_uttered', {
      message: this.messagesQueue.shift(),
      session_id: this.socket.id,
      metadata: { botId: this.botId }
    });
  }
}
