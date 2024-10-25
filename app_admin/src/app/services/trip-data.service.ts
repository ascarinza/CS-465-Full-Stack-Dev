import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TripDataService {
  private apiBaseUrl = 'http://localhost:3000/api';
  private tripUrl = `${this.apiBaseUrl}/trips`;

  constructor(private http: HttpClient, @Inject(BROWSER_STORAGE) private storage: Storage) {}

  getTrips(): Observable<Trip[]> {
    console.log('Fetching trips from API...');
    return this.http.get<Trip[]>(this.tripUrl).pipe(
      catchError(this.handleError)
    );
  }

  public addTrip(trip: Trip): Observable<Trip> {
    const token = localStorage.getItem('travlr-token');  // Consistent token key
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Trip>(this.tripUrl, trip, { headers });
  }

  getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.tripUrl}/${tripCode}`).pipe(catchError(this.handleError));
  }

  public updateTrip(trip: Trip): Observable<Trip> {
    const token = localStorage.getItem('travlr-token');  // Retrieve token from localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<Trip>(`${this.tripUrl}/${trip.code}`, trip, { headers });
  }

  deleteTrip(tripCode: string): Observable<any> {
    return this.http.delete(`${this.tripUrl}/${tripCode}`).pipe(catchError(this.handleError));
  }

  public login(user: User): Observable<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Observable<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Observable<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http.post<AuthResponse>(url, user).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error); // For demo purposes
    return throwError(error.message || 'Server error');
  }
}