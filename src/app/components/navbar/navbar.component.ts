import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent implements OnInit{

  private authService = inject(AuthService);
  private router = inject(Router);

  username: string | null = null;

  ngOnInit(): void {
    this.authService.username$.subscribe(username => {
      this.username = username;
    });
  }
  
  GoToProfile() {
    throw new Error('Method not implemented.');
  }

  logout() {
    this.authService.logout();
    this.navigateToAuth();
  }

  navigateToAuth() {
    this.router.navigate(['/auth']);
  }

}
