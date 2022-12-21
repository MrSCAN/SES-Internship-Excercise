import { Component, OnInit } from '@angular/core';
import { User } from './app.user';
import { InputService } from './input.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name?: string;
  surName?: string;
  id?: number;
  title = 'SES-USERS-FRONTEND';
  page: string = 'home';
  service;
  users: User[] = [];
  initialized = false;
  error = false;
  errorMessage?: string;
  success = false;
  successMessage?: string;
  count?: number;

  constructor(service: InputService) {
    this.service = service;
    this.error = false;
    this.success = false;
  }

  ngOnInit(): void {
    this.getUsers();
    this.initialized = true;
  }

  changeView(viewName: string): void {
    this.error = false;
    this.success = false;
    this.name = '';
    this.surName = '';
    this.count = undefined;
    this.page = viewName;
  }

  getUsers(): void {
    this.service.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  saveUser() {
    let data = [
      {
        name: this.name,
        surName: this.surName,
      },
    ];

    this.service.createUser(data).subscribe({
      next: (res) => {
        this.users.push(...res);
        this.success = true;
        this.successMessage =
          'User: ' + this.name + ' ' + this.surName + ' created successfuly';
        setTimeout(() => {
          this.changeView('home');
        }, 1000);
      },
      error: (e) => {
        this.error = true;
        this.errorMessage = e.error.message;
      },
    });
  }

  navigateToEditUser(userId: number) {
    this.id = userId;
    this.changeView('edit-user');
    let user = this.users.find((obj) => {
      return obj.id === userId;
    });
    this.name = user?.name;
    this.surName = user?.surName;
  }

  editUser() {
    const id = this.id;
    let data = {
      name: this.name,
      surName: this.surName,
    };
    this.service.updateUser(id, data).subscribe({
      next: (res) => {
        let index = this.users
          .map(function (e) {
            return e.id;
          })
          .indexOf(id);
        this.users.splice(index, 1, {
          id: id,
          name: this.name != undefined ? this.name : '',
          surName: this.surName != undefined ? this.surName : '',
        });
        this.success = true;
        this.successMessage = res.message;
        setTimeout(() => {
          this.changeView('home');
        }, 1000);
      },
      error: (e) => {
        this.error = true;
        this.errorMessage = e.error.message;
      },
    });
  }

  deleteUser(userId: number) {
    this.service.deleteUser(userId).subscribe({
      next: (res) => {
        let index = this.users
          .map(function (e) {
            return e.id;
          })
          .indexOf(userId);
        this.users.splice(index, 1);
        this.success = true;
        this.successMessage = res.message;
        setTimeout(() => {
          this.success = false;
        }, 1000);
      },
      error: (e) => {
        this.error = true;
        this.errorMessage = e.error.message;
      },
    });
  }

  generateMultipleUsers() {
    if (this.count == undefined || (this.count != undefined && this.count <= 0)) {
      this.error = true;
      this.errorMessage = 'Value must be greater than 0';
      return;
    }
    let data = {
      count: this.count,
    };

    this.service.generateMultipleUsers(data).subscribe({
      next: (res) => {
        this.users.push(...res);
        this.success = true;
        this.successMessage = this.count + ' new users created successfully';
        setTimeout(() => {
          this.changeView('home');
        }, 1000);
      },
      error: (e) => {
        this.error = true;
        this.errorMessage = e.error.message;
      },
    });
  }
}
