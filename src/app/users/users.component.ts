import { User } from 'src/model/user';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})


export class UsersComponent implements OnInit {
  // @ViewChild(MatTable, {static: true}) usersTable: MatTable<any>; 

  displayedColumns: string[] = ['id', 'name', 'gender', 'email', 'birthDate', 'naturality', 'nationality', 'cpf', 'createDate', 'updateDate', 'actions'];
  dataSource: User[];
  user: User = { id: null, name: '', gender: null, email: '', birthDate: null, naturality: '', nationality: '', cpf: '', createDate: null, updateDate: null };
  isLoadingResults = true;

  constructor(private _api: ApiService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._api.getUsers()
      .subscribe(res => {
        this.dataSource = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  getUser(id) {
    this._api.getUser(id)
      .subscribe(data => {
        this.user = data;
        console.log(this.user);
        this.isLoadingResults = false;
      });
  }

  deleteUser(id) {
    this._api.deleteUser(id)
      .subscribe(res => {
        this.isLoadingResults = false;
        this.getUsers();
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
  }

  // refresh() {
  //   this.usersTable.renderRows();
  // }

}
