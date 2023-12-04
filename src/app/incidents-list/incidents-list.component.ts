import { Component, Input } from '@angular/core';
import { IncidentService } from '../incident.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { Router } from '@angular/router';
import { incident } from '../incident';
import { MoreInfoComponent } from '../more-info/more-info.component';

@Component({
  selector: 'app-incidents-list',
  templateUrl: './incidents-list.component.html',
  styleUrl: './incidents-list.component.css',
  // template: `<h2>Parent Component</h2>
  // `
})
export class IncidentsListComponent {
  incidents: incident[] = [];
  sortedColumn: string = 'i.location';
  datafromstorage = '';
  selectedIncident?: incident;
  parentMessage = 'message from parent';
  showForm = false;
  loading: boolean = false;
  VALID_PASSWORD_HASH = 'fcab0453879a2b2281bc5073e3f5fe54';
  sortedDirection: string = 'asc';
  // @Input() show_more?: boolean;

  constructor(
    public is: IncidentService,
    private http: HttpClient // private router: Router
  ) {}

  ngOnInit(): void {
    this.getIncidents();
    console.log('all incidents');
    console.log(this.incidents);
  }

  getIncidents() {
    this.incidents = this.is.get();
  }

  onSelect(obj: incident): void {
    console.log(obj + 'function in listcomponent');
    this.selectedIncident = obj;
    // showMoreInfo = true;
  }

  delete(key: string) {
    const password = prompt('Enter password');
    // check if the password is not null
    if (password) {
      // set a loading flag to true
      this.loading = true;
      // use the Hashify API to get the MD5 hash of the password
      this.http
        .get(`https://api.hashify.net/hash/md5/hex?value=${password}`)
        .subscribe((data: any) => {
          // compare the hash value with the valid password hash
          if (data.Digest === this.VALID_PASSWORD_HASH) {
            // password is correct
            this.is.incidentDelete(key);
            this.incidents = this.incidents.filter(
              (report: any) => report.key != key
            );
            console.log(`person just got deleted!`);
          } else {
            // password is incorrect
            // display an error message
            alert('Wrong password. Please try again.');
          }
        });
      // url:string = 'https://272.selfip.net/apps/JIimrghhB7/collections/incidents/documents/' + key + '/';
    }
  }

  hideForm() {
    console.log(this.showForm);
    this.showForm = false;
  }

  private helper(a: any, b: any, isAsc: boolean): number {
    if (a < b) {
      return isAsc ? -1 : 1;
    }
    if (a > b) {
      return isAsc ? 1 : -1;
    }
    return 0;
  }

  sortData(activeColumn: string) {
    const isAsc = this.sortedColumn === activeColumn && this.sortedDirection === 'asc';
    this.sortedColumn = activeColumn;
    this.sortedDirection = isAsc ? 'desc' : 'asc';
  
    const data = this.incidents.slice();
    if (!isAsc) {
      data.reverse();
    }

    this.incidents = data.sort((a, b) => {
      switch (activeColumn) {
        case 'i.location':
          return this.helper(a.location, b.location, !isAsc);
        case 'i.troublemaker_name':
          return this.helper(a.troublemaker_name, b.troublemaker_name, !isAsc);
        case 'i.reported_at':
          return this.helper(a.reported_at, b.reported_at, !isAsc);
        case 'status':
          return this.helper(a.status, b.status, !isAsc);
        default:
          return 0;
      }
    });
  }
}
