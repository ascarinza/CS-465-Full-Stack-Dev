import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup,  Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css'] // Fixed 'styleUrl' to 'styleUrls'
})
export class AddTripComponent implements OnInit {
  public addForm!: FormGroup;
  submitted = false;
  public formError: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      tripLength: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    this.formError = '';  // Clear previous errors

    if (this.addForm.valid) {
      this.tripDataService.addTrip(this.addForm.value)
        .subscribe({
          next: (response) => {
            console.log('Trip added successfully:', response);
            this.router.navigate(['/']);  // Redirect after successful addition
          },
          error: (error) => {
            console.log('Error adding trip:', error);
            if (error.status === 401) {
              this.formError = 'You are not authorized. Please log in again.';
            } else {
              this.formError = 'An error occurred while adding the trip. Please try again.';
            }
          }
        });
    } else {
      this.formError = 'All fields are required.';
    }
  }

  // Get the form short name to access the form fields
  get f() {
    return this.addForm.controls;
  }
}