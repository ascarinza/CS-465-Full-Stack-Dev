import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { TripDataService } from '../services/trip-data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) {}

  public getToken(): string {
    return this.storage.getItem('travlr-token') || '';
  }

  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  // Logs in the user by calling the login method in TripDataService.
  public login(user: User): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tripDataService.login(user).subscribe(
        (authResp: AuthResponse) => {
          this.saveToken(authResp.token);
          resolve();
        },
        (error) => {
          console.error('Login failed', error);
          reject(new Error('Login failed. Please check your credentials.'));
        }
      );
    });
  }

  // Registers the user by calling the register method in TripDataService.
  public register(user: User): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tripDataService.register(user).subscribe(
        (authResp: AuthResponse) => {
          this.saveToken(authResp.token);
          resolve();
        },
        (error) => {
          console.error('Registration failed', error);
          reject(new Error('Registration failed. Please try again.'));
        }
      );
    });
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  // Retrieves the current user's information from the token.
  public getCurrentUser(): User | undefined {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      return { email, name } as User;
    }
    return undefined; // Return undefined if the user is not logged in
  }
}