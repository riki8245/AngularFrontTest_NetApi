import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authenticate',
  imports: [FormsModule],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.scss'
})
export class AuthenticateComponent {

  username: string = '';
  password: string = '';

  errorMessage: any;

  private auth = inject(AuthService);
  private readonly router = inject(Router);

  constructor() { }

  onLogin() {
    this.auth.login$(this.username, this.password).subscribe((response) => {
      console.log('Login succesful', response);

      console.log('El token del user', this.auth.getToken());

      this.navigateToArticuloExt();

    }, (error) => { this.errorMessage = error
      console.error('Login failed component', error);
      this.password = "";
    });
  }

  navigateToArticuloExt() {
    this.router.navigate(['/mainpage']);
  }

}
