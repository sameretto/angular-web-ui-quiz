import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  task: string;
  description: string;
  status: number;
}

interface AllStatus {
  value: Status;
  viewValue: string;
}

export enum Status {
  TODO = 0,
  IN_PROGRESS = 1,
  DONE = 2,
}

@Component({
  selector: 'app-task-creater-dialog',
  templateUrl: './task-creater-dialog.component.html',
  styleUrls: ['./task-creater-dialog.component.scss'],
})
export class TaskCreaterDialogComponent {
  allStatus: AllStatus[] = [
    { value: Status.TODO, viewValue: 'To Do' },
    { value: Status.IN_PROGRESS, viewValue: 'In Progress' },
    { value: Status.DONE, viewValue: 'Done' },
  ];
  constructor(
    public dialogRef: MatDialogRef<TaskCreaterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
