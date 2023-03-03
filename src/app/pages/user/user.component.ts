import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../../common/services/user.service';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  settings = {
    mode: 'inline',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      password: {
        title: 'Password',
        type: 'password',
      },
      isActive: {
        title: 'Active',
        type: 'boolean',
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(res => {
      if (res) {
        this.source.load(res.map(el => {
          return {
            ...el,
            password: '*********',
          };
        }));
      }
    });
  }

  onCreateConfirm(event): void {
    this.userService.createUser(event.newData).subscribe();

  }

  onEditConfirm(event): void {
    this.userService.updateUser(event.newData).subscribe();
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      this.userService.deleteUser(event.data._id).subscribe();
    } else {
      event.confirm.reject();
    }
  }
}
