import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { incident } from './incident';

@Injectable({
  providedIn: 'root',
})
export class IncidentService {
  incidents: incident[] = [];
  incidents_for_status: incident[] = [];
  single_for_status?: incident
  inc?: incident[];
  i: number = 0;

  constructor(private http: HttpClient) {
    this.http
      .get(
        'https://272.selfip.net/apps/JIimrghhB7/collections/incidents/documents/'
      )
      .subscribe((res) => {
        var getIncident = <Array<any>>res;
        console.log(getIncident);

        if (getIncident.length > 0) {
          for (let i = 0; i < getIncident.length; i++) {
            console.log(getIncident[i].data[0].location);
            let newInc = new incident(
              getIncident[i].data[0].reporter_name,
              getIncident[i].data[0].reporter_phone,
              getIncident[i].data[0].troublemaker_name,
              getIncident[i].data[0].location,
              getIncident[i].data[0].image_url,
              getIncident[i].data[0].problem_description,
              getIncident[i].data[0].reported_at,
              getIncident[i].data[0].status,
              getIncident[i].key
            );
            this.incidents.push(newInc);
            console.log(getIncident[i].key);
          }
        }
      });
  }

  get() {
    return this.incidents;
  }

  add(inc: incident) {
    this.i = new Date().getTime();
    inc.reported_at = this.i.toString();
    inc.status = 'Open';
    this.http
      .post(
        'https://272.selfip.net/apps/JIimrghhB7/collections/incidents/documents/',
        {
          key: this.i.toString(),
          data: [
            {
              reporter_name: inc.reporter_name,
              reporter_phone: inc.reporter_phone,
              troublemaker_name: inc.troublemaker_name,
              location: inc.location,
              image_url: inc.image_url,
              problem_description: inc.problem_description,
              reported_at: inc.reported_at,
              status: inc.status, // "Resolved" once the problem has been solved
              // {"longitude": "long",
              // "latitude": "lat"} 
            },
          ],
        }
      )
      .subscribe((data) => {
        console.log(data + 'single incident');
        this.incidents.push(inc);
      });
  }

  incidentDelete(incident_key: string) {
    this.http
      .delete<number>(
        'https://272.selfip.net/apps/JIimrghhB7/collections/incidents/documents/' +
          incident_key
      )
      .subscribe((incident) => {
        console.log(incident);
      });
  }

  edit(incoming_key: any, newStatus: string): Observable<any> {
    this.incidents_for_status = this.get()
    console.log(this.incidents_for_status)

    console.log(
      // incoming_key.data[0] +
      incoming_key + "key and element " + this.incidents_for_status[incoming_key] 
    ); 
        const url = 'https://272.selfip.net/apps/JIimrghhB7/collections/incidents/documents/' + incoming_key;

        for(let j=0; j<this.incidents_for_status.length; j++) {
          if(this.incidents_for_status[j].key === incoming_key) {
            this.single_for_status = this.incidents_for_status[j]
          }
        }
        //  this.incidents_for_status = this.incidents_for_status.filter(
        //   (report: any) => report.key == incoming_key
        // );
        const payload = [{ status: newStatus, 
          location: this.single_for_status!.location, 
          troublemaker_name: this.single_for_status!.troublemaker_name,
          image_url: this.single_for_status!.image_url, 
          reporter_name: this.single_for_status!.reporter_name, 
          reporter_phone: this.single_for_status!.reporter_phone, 
          problem_description: this.single_for_status!.problem_description,
          reported_at: this.single_for_status!.reported_at,
         }];
  
        
        return this.http.patch(url,
          {
            key: incoming_key,
            data: payload
          });
  }
}
