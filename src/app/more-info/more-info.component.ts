import { Component, Input } from '@angular/core';
import { IncidentService } from '../incident.service';
import { IncidentsListComponent } from '../incidents-list/incidents-list.component';
import { incident } from '../incident';


@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrl: './more-info.component.css'
})
export class MoreInfoComponent {
  incidents: incident[] = [];
  @Input() incoming_incident?: incident
  selectedIncident?:incident;
  status_options:boolean = true;
  buttonName: string = 'Change status to Resolved';

  constructor(private i_service:IncidentService){}

  getIncidents() {
    this.incidents = this.i_service.get();
  }

  onSelect(incid:incident) {
    console.log("function in listcomponent.ts" + incid)
    this.selectedIncident = incid;
    // let newincident = this.listcomp.getMoreInfo(key);
    // return newincident;
  }

  hide(){
    let temp = this.incoming_incident
    this.incoming_incident = undefined
  }

  showOptions(key?:string, old_status?:string) {
      this.status_options = !this.status_options;
    if(this.incoming_incident != undefined){
    // Change the name of the button.
    if(this.status_options) {
      this.incoming_incident.status = "Open";
      this.getIncidents()
      this.buttonName = "Change Status to Resolved";
    }
    else {
      this.buttonName = "Change Status to Open";
      this.incoming_incident.status = "Resolved";
      this.getIncidents()
    }
  }
  }

  onEdit(key:string, old_status:string) {

  }
}
