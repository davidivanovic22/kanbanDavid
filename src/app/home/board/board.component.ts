import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/_models/task';
import { User } from 'src/app/_models/user';
import { TaskDialogComponent } from '../task/task-dialog/task-dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit {

  userList: User[] = [{
    id: '1',
    username: 'david',
    password: 'david2',
    firstName: 'david',
    lastName: 'david',
    photo: 'https://st2.depositphotos.com/1007566/11569/v/950/depositphotos_'
      + '115690782-stock-illustration-young-and-elegant-woman-avatar.jpg',
    isDeleting: false
  },
  {
    id: '2',
    username: 'david',
    password: 'david2',
    firstName: 'david',
    lastName: 'david',
    photo: 'https://st2.depositphotos.com/1007566/11569/v/950/depositphotos_'
      + '115690782-stock-illustration-young-and-elegant-woman-avatar.jpg',
    isDeleting: false
  },
  {
    id: '3',
    username: 'david',
    password: 'david2',
    firstName: 'david',
    lastName: 'david',
    photo: 'https://st2.depositphotos.com/1007566/11569/v/950/depositphotos_'
      + '115690782-stock-illustration-young-and-elegant-woman-avatar.jpg',
    isDeleting: false
  }];

  todo: Task[] = [
    {
      title: 'Buy milk',
      description: 'Go'
    },
    {
      title: 'Create a Kanban app',
      description: 'Using Firebase and Angular create a Kanban app!',
      userList: this.userList
    },
    {
      title: 'Create a Kanban app',
      description: 'Using Firebase and Angular create a Kanban app!'
    },
    {
      title: 'Create a Kanban app',
      description: 'Using Firebase and Angular create a Kanban app!'
    },
    {
      title: 'Create a Kanban app',
      description: 'Using Firebase and Angular create a Kanban app!'
    },
    {
      title: 'Create a Kanban app',
      description: 'Using Firebase and Angular create a Kanban app!'
    },
    {
      title: 'Create a Kanban app',
      description: 'Using Firebase and Angular create a Kanban app!'
    }
  ];

  connectedTo: any = [];


  inProgress: Task[] = [
    {
      title: 'Create a Kanban app',
      description: 'Using Firebase and Angular create a Kanban app!'
    }, ];
  done: Task[] = [];

  statusList = [{
    id: 1,
    status: 'Backlog', taskList: this.todo
  },
  { id: 2, status: 'In progress', taskList: this.inProgress },
  { id: 3, status: 'Done', taskList: this.done },
  { id: 4, status: 'Testing', taskList: [] },
  { id: 4, status: 'Testing', taskList: [] },
  { id: 4, status: 'Testing', taskList: [] }, { id: 4, status: 'Testing', taskList: [] }];



  constructor(private dialog: MatDialog) {
    for (const status of this.statusList) {
      this.connectedTo.push(status.status);
    }
  }
  ngOnInit(): void {

  }


  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {},
      },
      disableClose: true
    });
    dialogRef
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          // this.statusList.taskList.push(result.task);
        }
      }
      );
  }

  editTask(list: any, task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true,
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((result) => {
      const dataList = list;
      const taskIndex = dataList.indexOf(task);
      console.log(result, 'Ovdee');

      if (result.delete) {

        dataList.splice(taskIndex, 1);
      } else {
        dataList[taskIndex] = task;
      }
    });
  }


  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
