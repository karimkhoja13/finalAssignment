import { Component } from '@angular/core';
import { IncidentService } from '../incident.service';

@Component({
  selector: 'app-incidents-list',
  templateUrl: './incidents-list.component.html',
  styleUrl: './incidents-list.component.css'
})
export class IncidentsListComponent {
  incidents:any;
  sortedColumn: string = 'incident.data';
  datafromstorage = '';

  constructor(private is: IncidentService) {
    }

    ngOnInit(): void {
      this.incidents = this.is.get()
        // assign the data to the incidents array
        // console.log(this.incidents);
      }
}
