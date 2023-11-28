import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  incidents:any
  i:number = 0;

  constructor(private http: HttpClient){
  }
  get() {
    this.http.get('https://272.selfip.net/apps/JIimrghhB7/collections/incidents/documents/')
    .subscribe((data)=>{
      this.incidents = data;
    });
    return this.incidents
    //  this.http.get('https://272.selfip.net/apps/JIimrghhB7/collections/incidents/documents/')
    //   .pipe(map((alldata: any) => alldata.data));
  }
  get_one(key: string) {
    this.http.get('https://272.selfip.net/apps/JIimrghhB7/collections/incidents/documents/')
    .subscribe((data)=>{
      this.incidents = data;
    });
    return this.incidents
  }
  add(){
    this.i = new Date().getTime()
    this.http.post('https://272.selfip.net/apps/JIimrghhB7/collections/incidents/documents/',{
      "key": this.i.toString(),
      "data": [{
        "reporter_name": "reporter-name",
        "troublemake_name": "troublemaker-name",
        "location": "test-location-1", 
        "image_url": "optional",
        "problem_description": "the bad guy is loudly singing out of tune",
        "reported_at": this.i,
        "status": "Open" // "Resolved" once the problem has been solved
        // {"longitude": "long",
        // "latitude": "lat"}
      }]
    }).subscribe(
      (data:any)=>{
        console.log(data);
    })
  }

  delete(){
    this.http.delete('https://272.selfip.net/apps/JIimrghhB7/collections/incidents/documents/1701119431614/')
  }
}
