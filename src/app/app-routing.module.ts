import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { NewUserComponent } from './new-user/new-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    data: { title: 'List of Users' }
  },
  {
    path: 'new-user',
    component: NewUserComponent,
    data: { title: 'Add User' }
  },
  {
    path: 'edit-user/:id',
    component: EditUserComponent,
    data: { title: 'Edit User' }
  },
  { path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
