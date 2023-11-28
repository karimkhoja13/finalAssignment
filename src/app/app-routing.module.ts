import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidentsListComponent } from './incidents-list/incidents-list.component';

const routes: Routes = [
  // { path: '/incidents/documents', component: IncidentsListComponent },
  // { path: 'AddEmployee', component: AddEmployeeComponent },
  // { path: 'EditEmployee/:employeeId', component: EditEmployeeComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
