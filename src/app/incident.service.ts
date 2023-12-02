import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { incident } from './incident';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  incidents:incident[] = []
  // incid: incident;
  i:number = 0;

  constructor(private http: HttpClient){
    this.http.get('https://272.selfip.net/apps/JIimrghhB7/collections/incidents/documents/')
    .subscribe((res)=>{
      var getIncident = <Array<any>>res;
      console.log(getIncident)

      if(getIncident.length > 0) {
        for ( let i = 0; i < getIncident.length; i++) {
          
          console.log(getIncident[i].data[0].location);
          let newInc = new incident(
            getIncident[i].data[0].reporter_name,
            getIncident[i].data[0].troublemaker_name,
            getIncident[i].data[0].location,
            getIncident[i].data[0].image_url,
            getIncident[i].data[0].problem_description,
            getIncident[i].data[0].reported_at,
            getIncident[i].data[0].status,
            getIncident[i].key
          )
          this.incidents.push(newInc)
          console.log(getIncident[i].key)
        }
      }
    });
  }

  get() {
    return this.incidents
    // return this.incidents
    //  this.http.get('https://272.selfip.net/apps/JIimrghhB7/collections/incidents/documents/')
    //   .pipe(map((alldata: any) => alldata.data));
  }

  get_one(key: string) {
    this.http.get('https://272.selfip.net/apps/JIimrghhB7/collections/incidents/documents/' + key)
    .subscribe((data)=>{
      console.log(data);
      // return data;
    });
  }

  add(inc:incident) {
    this.i = new Date().getTime()
    inc.reported_at = this.i.toString()
    inc.status = "Open"
    inc.location = "test-location"
    this.http.post('https://272.selfip.net/apps/JIimrghhB7/collections/incidents/documents/',{
      "key": this.i.toString(),
      "data": [{
        "reporter_name": inc.reporter_name,
        "troublemaker_name": inc.troublemaker_name,
        "location": inc.location, 
        "image_url": inc.image_url,
        "problem_description": inc.problem_description,
        "reported_at": inc.reported_at,
        "status": inc.status // "Resolved" once the problem has been solved
        // {"longitude": "long",
        // "latitude": "lat"}
      }]
    }).subscribe(
      (data)=>{
        console.log(data + "single incident");
        this.incidents.push(inc);
    })
  }

  incidentDelete(incident_key: string){
    this.http.delete<number>('https://272.selfip.net/apps/JIimrghhB7/collections/incidents/documents/' + incident_key)
    .subscribe((incident) => {
      console.log(incident);
    });
  }

  // edit(key:string, status:string) {
  //   let single_incident = this.get_one(key);
  //   if(single_incident.status === "Open"){
  //     this.httpClient.put('https://272.selfip.net/apps/JIimrghhB7/collections/incidents/documents/' + key,
  //     ).subscribe(data => {
  //       console.log(data);
  //     });

  //   }
  //   this.incid.status = inc.status
  //   console.log(inc.status)



  //   this.http.post('https://272.selfip.net/apps/JIimrghhB7/collections/incidents/documents/',{
  //     "key": this.i.toString(),
  //     "data": [{
  //       "reporter_name": inc.reporter_name,
  //       "troublemaker_name": inc.troublemaker_name,
  //       "location": inc.location, 
  //       "image_url": inc.image_url,
  //       "problem_description": inc.problem_description,
  //       "reported_at": inc.reported_at,
  //       "status": inc.status // "Resolved" once the problem has been solved
  //       // {"longitude": "long",
  //       // "latitude": "lat"}
  //     }]
  //   }).subscribe(
  //     (data)=>{
  //       console.log(data + "single incident");
  //       this.incidents.push(inc);
  //   })




  // }
}

// BookDelete (bookid:String):Observable<number>{
//   let httpheaders=new HttpHeaders()
//   .set('Content-type','application/Json');
//   let options={
//     headers:httpheaders
//   };
//   return this.http.delete<number>(this.bookUrl+"/"+bookid);
// }