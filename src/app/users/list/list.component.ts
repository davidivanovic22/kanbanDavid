import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';
import { User } from '../../_models';

import { AccountService } from '../../_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users: User[] = [];
    displayedColumns: string[] = ['firstName', 'lastName', 'username', 'actions'];
    dataSource = new MatTableDataSource(this.users);

    constructor(private accountService: AccountService) { }

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => {
                this.users = users;
                this.dataSource = new MatTableDataSource(this.users);
            });
    }

    deleteUser(id: string): void {
        const user: any = this.users.find(x => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.users = this.users.filter(x => x.id !== id);
            });
    }
}
