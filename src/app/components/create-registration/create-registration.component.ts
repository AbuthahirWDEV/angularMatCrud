import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss'],
})
export class CreateRegistrationComponent implements OnInit {
  public packages = ['Monthly', 'quaterly', 'yearly'];
  public importantList: string[] = [
    "Toxic fat reduction",
    "Energy and Endurance",
    "Building lean muscle",
    "Healthier Digestive system",
    "Sugar Craving Body",
    "Fitness"
  ]

  public registerForm!: FormGroup;

  constructor(private fb:FormBuilder) {
    
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: [""],
      lastName: [""],
      email: [""],
      mobile: [""],
      weight: [""],
      height: [""],
      bmi: [""],
      bmiResults: [""],
      gender: [""],
      requireTrainer: [""],
      package: [""],
      important: [""],
      haveGymBefore: [""],
      enquiryDate: [""]
    })
  }

  submit(){
    console.log(this.registerForm.value)
  }
}
