import { Component } from '@angular/core';
import { IncidentService } from '../incident.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { incident } from '../incident';
import { MoreInfoComponent } from '../more-info/more-info.component';

@Component({
  selector: 'app-incidents-list',
  templateUrl: './incidents-list.component.html',
  styleUrl: './incidents-list.component.css'
  // template: `<h2>Parent Component</h2>
  // `
})
export class IncidentsListComponent {
  incidents: incident[] = [];
  sortedColumn: string = 'i.location';
  datafromstorage = '';
  selectedIncident?:incident
  parentMessage = "message from parent"

  constructor(
    public is: IncidentService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getIncidents();
    console.log("all incidents")
    console.log(this.incidents)
  }

  getIncidents() {
    this.incidents = this.is.get();
  }

  onSelect(obj:incident):void {
    console.log("function in listcomponent")
    this.selectedIncident = obj
  }

  delete(key: string) {
    // url:string = 'https://272.selfip.net/apps/JIimrghhB7/collections/incidents/documents/' + key + '/';
    this.is.incidentDelete(key);
    this.incidents = this.incidents.filter((report: any)=> report.key != key)
    console.log(`person just got deleted!`)
  }
}
