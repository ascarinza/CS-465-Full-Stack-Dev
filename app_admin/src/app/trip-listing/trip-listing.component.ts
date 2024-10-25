import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
})
export class TripListingComponent implements OnInit {
  trips!: Trip[];
  message: string = '';

  constructor(
    private tripDataService: TripDataService,
    private router: Router, 
    private authenticationService: AuthenticationService 
  ) {
    console.log('trip-listing constructor');
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  public removeTrip(tripCode: string): void {
    this.trips = this.trips.filter(trip => trip.code !== tripCode);
  }

  private getStuff(): void {
    this.tripDataService.getTrips()
      .subscribe({
        next: (trips: Trip[]) => { // Specify the type here

          console.log('Fetched trips:', trips);
          this.trips = trips; // Use the correct type
          if (trips.length > 0) {
            this.message = 'There are ' + trips.length + ' trips available';
          } else {
            this.message = 'There were no trips received from the database';
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }
}