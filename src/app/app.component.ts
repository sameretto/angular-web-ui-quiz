import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { combineLatest, filter, of, switchMap, take, tap } from 'rxjs';
import {
  DialogData,
  TaskCreaterDialogComponent,
} from './task-creater-dialog/task-creater-dialog.component';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-web-ui-quiz';
  displayedColumns: string[] = [
    'id',
    'task',
    'description',
    'status',
    'createdAt',
    'updatedAt',
    'action',
  ];
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  tasks = new MatTableDataSource([] as Task[]);
  constructor(
    private readonly taskService: TaskService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks.data = tasks;
    });
  }
  ngAfterViewInit() {
    this.tasks.sort = this.sort;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskCreaterDialogComponent, {
      width: '350px',
      data: { task: undefined, description: undefined, status: undefined },
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((res: DialogData) => !!res.task || !!res.status),
        switchMap((res: DialogData) =>
          combineLatest([this.taskService.getTasks(), of(res)])
        ),
        switchMap(([tasks, res]) =>
          this.taskService.createTask({
            ...res,
            id: tasks[tasks?.length - 1]?.id + 1 ?? 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
        ),
        tap(() =>
          this._snackBar.open('Task created', 'Close', {
            duration: 2000,
            horizontalPosition: 'right',
          })
        )
      )
      .subscribe();
  }

  public getTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks.data = tasks;
    });
  }

  public deleteTask(row: Task): void {
    this.taskService
      .deleteTask(row.id)
      .pipe(
        tap(() => {
          this._snackBar.open('Task deleted', 'Close', {
            duration: 2000,
            horizontalPosition: 'right',
          });
          this.getTasks();
        })
      )
      .subscribe();
  }

  public updateTask(row: Task): void {
    const dialogRef = this.dialog.open(TaskCreaterDialogComponent, {
      width: '350px',
      data: {
        task: row.task,
        description: row.description,
        status: row.status,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((res: DialogData) => !!res.task || !!res.status),
        switchMap((res) =>
          this.taskService.updateTask({
            ...res,
            id: row.id,
            createdAt: row.createdAt,
            updatedAt: new Date().toISOString(),
          })
        ),
        tap(() => {
          this._snackBar.open('Task updated', 'Close', {
            duration: 2000,
            horizontalPosition: 'right',
          });
          this.getTasks();
        })
      )
      .subscribe();
  }
}
