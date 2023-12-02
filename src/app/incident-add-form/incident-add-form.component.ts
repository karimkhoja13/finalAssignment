import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { IncidentService } from '../incident.service';

@Component({
  selector: 'app-incident-add-form',
  templateUrl: './incident-add-form.component.html',
  styleUrl: './incident-add-form.component.css'
})
export class IncidentAddFormComponent {
  
  form: FormGroup
  constructor(private is: IncidentService, private router: Router){
    let formControls = {
      reporter_name: new FormControl('',[
        Validators.required,
        Validators.minLength(4)
        
      ]),
      troublemaker_name: new FormControl(),
      image_url: new FormControl(),
      problem_description: new FormControl()
    }
    this.form = new FormGroup(formControls)
  }

  onSubmit(newIncident:any) {
    console.log(newIncident)
    this.is.add(newIncident)

    // this.is.get();
    // this.router.navigate([""])
  }
}
