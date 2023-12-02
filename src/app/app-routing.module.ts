import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidentsListComponent } from './incidents-list/incidents-list.component';
import { IncidentAddFormComponent } from './incident-add-form/incident-add-form.component';

const routes: Routes = [
  // { path: '', component: IncidentsListComponent },
  // { path: 'AddIncident', component: IncidentAddFormComponent }
  // { path: 'EditEmployee/:employeeId', component: EditEmployeeComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
