import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from './list-user/list-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const route: Routes = [
  { 
    path: '',  
    pathMatch: 'full',
    redirectTo: 'recordlist' 
  },
  { 
    path: 'recordlist', 
    component: ListUserComponent 
  },
  { 
    path: 'addrecord', 
    component: AddUserComponent 
  },
  {
    path: 'edituser',
    component: EditUserComponent
  }
  // { 
  //   path: '**', 
  //   component: AddUserComponent 
  // },
]

@NgModule({
  imports: [
    RouterModule.forRoot(route)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
