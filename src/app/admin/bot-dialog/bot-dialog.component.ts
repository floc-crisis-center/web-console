import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bot } from 'src/app/bot/bot';

@Component({
  selector: 'app-bot-dialog',
  templateUrl: './bot-dialog.component.html',
  styleUrls: ['./bot-dialog.component.css']
})
export class BotDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<BotDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Bot) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
