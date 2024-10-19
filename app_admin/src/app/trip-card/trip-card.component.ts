import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css'
})
export class TripCardComponent implements OnInit{
    @Input('trip') trip: any;

    constructor(private router: Router, private tripDataService: TripDataService) {}

    ngOnInit(): void {

    }

    public editTrip(trip: Trip) {
      localStorage.removeItem('tripCode');
      localStorage.setItem('tripCode', trip.code);
      this.router.navigate(['edit-trip']);
    }

    public deleteTrip(trip: Trip) {
      if (confirm('Are you sure you want to delete the trip: ' + trip.name + '?')) {
        this.tripDataService.deleteTrip(trip.code)
          .subscribe({
            next: (response: any) => {
              console.log('Trip deleted successfully:', response);
              window.location.reload();
            },
            error: (error: any) => {
              console.log('Error deleting trip:', error);
            }
          });
      }
    }

}
