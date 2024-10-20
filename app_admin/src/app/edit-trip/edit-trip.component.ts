import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css'
})
export class EditTripComponent implements OnInit{
  public editForm!:FormGroup;
  trip!: Trip;
  submitted = false;
  message : string = '';
  formError: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService
  ){}

  ngOnInit(): void {
    //Get stashed trip ID
    let tripCode = localStorage.getItem("tripCode");
    if(!tripCode){
      alert("Something wrong, could not find where I stashed tripCode!");
      this.router.navigate([""]);
      return;
    }
    
    console.log('EditTripComponent::ngOnInit');
    console.log('tripCode: ' + tripCode);

    this.editForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      tripLength: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    })

    this.tripDataService.getTrip(tripCode)
      .subscribe({
        next: (value: any) => {
          //Populate record into form
          this.editForm.patchValue(value[0]);
          if(!value) {
            this.message = "No Trip Retrieved!";
          }
          else {
            this.message = 'Trip: ' + tripCode + ' retrieved';
          }

          console.log(this.message);
          },

          error: (error: any) => {
            console.log('Error: ' + error);
        }
      })

  }

  public onSubmit() {
    this.submitted = true;
  
    if (this.editForm.valid) {
      this.tripDataService.updateTrip(this.editForm.value)
        .subscribe({
          next: (value: any) => {
            console.log('Trip updated successfully:', value);
            this.router.navigate(['']); // Redirect after successful update
          },
          error: (error: any) => {
            console.log('Error updating trip:', error);
            // Check if the error is related to authentication
            if (error.status === 401) {
              this.formError = 'You are not authorized. Please log in again.';
            }
          }
        });
    }
  }

  public deleteTrip(tripCode: string): void {
    this.tripDataService.deleteTrip(tripCode)
      .subscribe({
        next: (response: any) => {
          console.log('Trip deleted successfuly: ' , response);
          this.router.navigate(['']);
        },
        error: (error: any) => {
          console.log('Error deleting trip: ', error);
        }
      })
    }
    
  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }

}
