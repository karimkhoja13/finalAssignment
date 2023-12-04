import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { IncidentService } from '../incident.service';
import { IncidentsListComponent } from '../incidents-list/incidents-list.component';

@Component({
  selector: 'app-incident-add-form',
  templateUrl: './incident-add-form.component.html',
  styleUrl: './incident-add-form.component.css'
})
export class IncidentAddFormComponent {
  
  // private map!: L.Map
  form: FormGroup
  showForm:boolean = true

  constructor(private is: IncidentService, private router: Router, private ilc: IncidentsListComponent){
    

    // console.log("Show Form: " + this.showForm)
    // var map = L.map('map').setView([51.505, -0.09], 13);

    // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    // maxZoom: 19,
    // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // }).addTo(map);

    let formControls = {
      reporter_name: new FormControl('',[
        Validators.required,
        Validators.minLength(4)
        // more validators
      ]),
      reporter_phone: new FormControl(),
      troublemaker_name: new FormControl(),
      location: new FormControl(),
      image_url: new FormControl(),
      problem_description: new FormControl()
    }
    this.form = new FormGroup(formControls)
  }

  

  // ngOnInit(): void {
  //   this.showMap()
  // }

  // showMap() {
  //   this.map = L.map('mapid').setView([49.2, -123], 11);

  //   const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //   maxZoom: 19,
  //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  //   }).addTo(this.map);

  //   L.marker([49.2276, -123.0076]).addTo(this.map)
  //   .bindPopup('<b>Metrotown</b><br>cases reported').openPopup();

  //   L.marker([49.2276, -123.0076]).addTo(this.map)
  //   .bindPopup('<b>SFU Surrey</b><br>cases reported').openPopup();
  // }
  

  // pk.eyJ1Ijoia2tob2phIiwiYSI6ImNscG9vYWUxeTBxMXoycXFuaDdvNDFhbzUifQ.rVyVodE0eprY14LVDJ7ZDA

  onSubmit(newIncident:any) {
    if(this.showForm === true) {
    console.log(newIncident)
    this.is.add(newIncident)
    }
    else if (this.showForm === false) {
      console.log ("HideForm function in add form component")
      this.ilc.hideForm();
    }

    // this.is.get();
    // this.router.navigate([""])
  }

  toggle(): void {
    this.showForm = false;
  }
}

