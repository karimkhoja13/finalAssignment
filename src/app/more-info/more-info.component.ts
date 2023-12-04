import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IncidentService } from '../incident.service';
import { IncidentsListComponent } from '../incidents-list/incidents-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { incident } from '../incident';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrl: './more-info.component.css',
})
export class MoreInfoComponent {
  incidents: incident[] = [];
  @Input() incoming_incident?: incident;
  @Input() showMoreInfo?: boolean;
  @Output() sendIncident = new EventEmitter();
  selectedIncident?: incident;
  status_options?: string = '';
  buttonName: string = 'Change status to ';
  loading: boolean = false;
  VALID_PASSWORD_HASH = 'fcab0453879a2b2281bc5073e3f5fe54';

  constructor(private i_service: IncidentService, private http: HttpClient) {}

  getIncidents() {
    this.incidents = this.i_service.get();
  }

 // In your component class
// showMoreInfo: boolean = false;

// Update the onSelect and hideDetails methods
onSelect(obj: incident): void {
  this.selectedIncident = obj;
  this.showMoreInfo = true;
}

hideDetails(): void {
  if(this.showMoreInfo = true)
  this.showMoreInfo = false;
else
this.showMoreInfo = true;
  // this.incoming_incident = undefined;
}


  // hide() {
  //   let temp = this.incoming_incident;
  //   this.incoming_incident = undefined;
  // }

  showOptions(key?: string, old_status?: string) {
    const password = prompt('Enter password');
    // check if the password is not null
    if (password) {
      // set a loading flag to true
      this.loading = true;
      this.http
        .get(`https://api.hashify.net/hash/md5/hex?value=${password}`)
        .subscribe((data: any) => {
          // compare the hash value with the valid password hash
          if (data.Digest === this.VALID_PASSWORD_HASH) {
            if (this.incoming_incident !== undefined) {
              if (old_status === 'Resolved') {
                this.status_options = 'Open';
                console.log(this.status_options + ' first and key ' + key);

                this.i_service.edit(key, this.status_options).subscribe(() => {
                  // Update the status in the component after the database update is successful
                  this.updateStatus();
                });
              } else if (old_status === 'Open') {
                this.status_options = 'Resolved';
                console.log(this.status_options + ' second and key ' + key);

                this.i_service.edit(key, this.status_options).subscribe(() => {
                  this.updateStatus();
                });
              }
            }
          } else {
            alert('Wrong password. Please try again.');
          }
        });
    }
  }

  private updateStatus() {
    // Ensure that this.status_options is not undefined before updating
    if (
      this.status_options !== undefined &&
      this.incoming_incident !== undefined
    ) {
      this.incoming_incident.status = this.status_options;
    }
  }

  onEdit(key: string, old_status: string) {}

  showHideInfo(val: boolean) {
    if (this.incoming_incident != undefined) {
      this.showMoreInfo = true;
    }
  }
}
