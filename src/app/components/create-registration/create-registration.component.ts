import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.modal';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss'],
})
export class CreateRegistrationComponent implements OnInit {
  public packages = ['Monthly', 'quaterly', 'yearly'];
  public importantList: string[] = [
    'Toxic fat reduction',
    'Energy and Endurance',
    'Building lean muscle',
    'Healthier Digestive system',
    'Sugar Craving Body',
    'Fitness',
  ];

  public registerForm!: FormGroup;
  public userIdToUpdate!: string;
  public isUpdateActive: boolean = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      weight: [''],
      height: [''],
      bmi: [''],
      bmiResults: [''],
      gender: [''],
      requireTrainer: [''],
      package: [''],
      important: [''],
      haveGymBefore: [''],
      enquiryDate: [''],
    });

    this.registerForm.controls['height'].valueChanges.subscribe((res) => {
      this.calculateBmi(res);
    });

    this.activatedRoute.params.subscribe((val) => {
      this.userIdToUpdate = val['id'];
      this.api.getRegisteredUserId(this.userIdToUpdate).subscribe((res) => {
        console.log(res);
        this.isUpdateActive = true;
        this.fillFormToUpdate(res);
      });
    });
  }

  submit() {
    if (!this.isUpdateActive) {
      this.api
      .postRegistration(this.registerForm.value)
      .subscribe((res) => {
        alert('Success');
      });
    } else {
      this.api
        .updateRegisterUser(this.registerForm.value, this.userIdToUpdate)
        .subscribe((res) => {
          alert('Updated Successfully');
          this.router.navigate(['list']);
        });
    }
  }

  calculateBmi(heightValue: Number) {
    const weight = this.registerForm.value.weight;
    const height = this.registerForm.value.height;
    const bmi = weight / (height * height);
    this.registerForm.controls['bmi'].patchValue(bmi);

    switch (true) {
      case bmi < 18.5:
        this.registerForm.controls['bmiResults'].patchValue('Underweight');
        break;
      case bmi >= 18.5 && bmi < 25:
        this.registerForm.controls['bmiResults'].patchValue('Normal weight');
        break;
      case bmi >= 25 && bmi < 30:
        this.registerForm.controls['bmiResults'].patchValue('Overweight');
        break;
      case bmi >= 30:
        this.registerForm.controls['bmiResults'].patchValue('Obese');
        break;
      default:
        this.registerForm.controls['bmiResults'].patchValue('Unknown');
    }
  }

  fillFormToUpdate(user: User) {
    this.registerForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      weight: user.weight,
      height: user.height,
      bmi: user.bmi,
      bmiResults: user.bmiResults,
      gender: user.gender,
      requireTrainer: user.requireTrainer,
      package: user.package,
      important: user.important,
      haveGymBefore: user.haveGymBefore,
      enquiryDate: user.enquiryDate,
    });
  }
}
